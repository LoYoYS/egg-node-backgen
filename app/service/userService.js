const Service = require("./BaseService.js");
module.exports = class userService extends Service {
  constructor(context) {
    super(context);
    this.model = this.app.model.User;
  }

  // 生成验证码
  generateCaptcha() {
    // 将验证码文本加密后存储到 Cookie 中
    const captcha = this.ctx.helper.createCaptcha();
    const captchaText = captcha.text.toLowerCase();
    const hash = ctx.helper.shaEcrypt(captchaText);
    // 存储到cookie中
    this.ctx.cookies.set("captcha", hash, {
      httpOnly: true,
      signed: true,
      encrypt: true,
      maxAge: 5 * 60 * 1000
    });
    // 返回请求结果
    return captcha.data;
  }

  // 验证码校验
  verifyCaptcha(captcha) {
    const { ctx } = this;
    const userInputCaptcha = captcha?.toLowerCase();
    if (!userInputCaptcha) return false;
    const captchaHash = ctx.cookies.get("captcha", {
      httpOnly: true,
      signed: true,
      encrypt: true,
      maxAge: 5 * 60 * 1000
    });
    ctx.cookies.set("captcha", null);
    if (captchaHash === ctx.helper.shaEcrypt(userInputCaptcha)) {
      return true;
    }
    return false;
  }

  async login(loginData) {
    const { ctx, model, service } = this;

    // if (!this.verifyCaptcha(loginData.captcha)) return { msg: "验证码错误!", code: 1 };

    loginData.password = ctx.helper.decryptString(loginData.password);
    loginData.password = ctx.helper.shaEcrypt(loginData.password);
    const { username, password } = loginData;

    // 查找用户是否存在
    let user = await model.findOne({ where: { username } });
    if (user === null) {
      return { msg: "用户不存在!", code: 1 };
    }

    // 检查登入失败次数
    const record = await service.loginLogService.checkLoginFailNumber(username);
    if (record) {
      return { msg: "今日登入失败次数超过5次,用户已被锁定,请联系管理员。", code: 1 };
    }

    user = await model.findOne({
      where: { username, password }
    });
    if (user === null) {
      service.loginLogService.createLoginLog(-1, "密码错误!");
      return { msg: "密码错误!", code: 1 };
    }

    const data = service.jwtService.createToken({ id: user.id });
    service.loginLogService.createLoginLog(1, "登录成功!");
    return { msg: "登入成功!", code: 0, data };
  }

  async getUserInfo() {
    const { ctx } = this;

    if (!ctx.uid) return { msg: "获取用户信息失败!", code: 1 };
    const data = await this.getUserRolesAndPermissions(ctx.uid);
    if (!data.user) return { msg: "用户不存在!", code: 1 };
    const result = {
      basicInfo: data.user,
      roles: data.roles,
      menus: data.menus
    };
    return { data: result, msg: "获取用户信息成功!", code: 0 };
  }

  async get(id) {
    const user = await this.model.findByPk(id, {
      include: [
        {
          model: this.app.model.Role,
          as: "roles",
          through: { attributes: [] }
        }
      ]
    });
    const roleIds = user.roles.map((role) => role.id);
    const newUser = JSON.parse(JSON.stringify(user));
    newUser.roles = roleIds;
    newUser.password = undefined;
    return newUser;
  }

  async add(user) {
    const record = await this.model.findOne({ where: { username: user.username } });
    if (record) return { msg: "用户名已存在!", code: 1 };
    const result = await this.model.create(user);
    if (result) {
      await this.updateRolePermissions(result.id, user.roles);
    }
    result.dataValues.password = undefined;
    return { data: result, msg: "新增用户成功!" };
  }

  async update(user) {
    const oldRow = await this.model.findByPk(user.id);
    if (!oldRow) return { msg: `没有找到id为${user.id}的记录` };
    const result = await oldRow.update(user);
    if (result) {
      await this.updateRolePermissions(user.id, user.roles);
    }
    result.dataValues.password = undefined;
    return { msg: "用户修改成功!", data: result };
  }

  async updateRolePermissions(uid, roles = []) {
    await this.app.model.UserRole.destroy({
      where: {
        uid
      }
    });
    for (const roleId of roles) {
      const permission = {
        uid,
        roleId,
        uidCreated: this.ctx.uid,
        uidUpdated: this.ctx.uid
      };
      await this.app.model.UserRole.create(permission);
    }
  }

  async updatepw() {
    const { ctx } = this;
    let { id, password } = ctx.request.body;
    password = ctx.helper.decryptString(password);
    password = ctx.helper.shaEcrypt(password);
    const oldRow = await this.model.findByPk(id);
    if (!oldRow) return { msg: `没有找到id为${id}的记录` };
    const result = await oldRow.update({ id, password, uidUpdated: ctx.uid });
    result.dataValues.password = undefined;
    return { data: result, msg: "修改密码成功!", code: 0 };
  }

  async delete(uid) {
    const oldRow = await this.model.findByPk(uid);
    if (!oldRow) return { msg: `没有找到id为${uid}的记录`, code: 1 };
    const result = await oldRow.destroy();
    if (result) {
      this.app.model.UserRole.destroy({
        where: {
          uid
        }
      });
    }
    return { msg: "用户删除成功!", data: result };
  }

  async getUserRolesAndPermissions(userId) {
    const user = await this.model.findByPk(userId, {
      include: [
        {
          model: this.app.model.Role,
          as: "roles",
          through: { attributes: [] }, //表示不需要中间表user_role的任何字段
          where: {
            status: 1
          },
          include: [
            {
              model: this.app.model.Permission,
              as: "permissions",
              through: { attributes: [] },
              where: {
                status: 1
              }
            }
          ]
        }
      ]
    });
    if (user) {
      const roles = user.roles;
      let permissions = [];
      roles.forEach((role) => {
        permissions = permissions.concat(role.permissions);
        role.dataValues.permissions = undefined;
      });
      permissions = this.ctx.helper.uniqueObjectsByProperty(permissions);
      user.dataValues.password = undefined;
      user.dataValues.roles = undefined;
      return {
        user,
        roles,
        menus: permissions
      };
    }
    return {};
  }

  async getUserPermissionCode(userId) {
    let permissionCodes = await this.app.redis.get(`user:${userId}:permissions`);
    if (permissionCodes) {
      return JSON.parse(permissionCodes);
    }
    const result = await this.getUserRolesAndPermissions(userId);
    permissionCodes = result.menus?.map((item) => item.code) || [];
    this.app.redis.set(`user:${userId}:permissions`, JSON.stringify(permissionCodes), "EX", 1800);
    return permissionCodes;
  }
};
