const BaseController = require("./BaseController");

class userController extends BaseController {
  constructor(context) {
    super(context);
    this.model = this.ctx.model.User;
    this.service = this.service.userService;
  }

  // 生成验证码
  generateCaptcha() {
    const result = this.service.generateCaptcha();
    this.ctx.setSuccess(result, "获取验证码成功!");
  }

  async login() {
    const result = await this.service.login(this.ctx.request.body);
    this.ctx.setSuccess(result.data, result.msg, result.code);
  }

  async getUserInfo() {
    const result = await this.service.getUserInfo();
    this.ctx.setSuccess(result.data, result.msg, result.code);
  }

  async updatepw() {
    const result = await this.service.updatepw();
    this.ctx.setSuccess(result.data, result.msg, result.code);
  }

  async getList() {
    this.ctx.request.query._attributesExclude = "password";
    await this.findAndCountAll();
  }

  async getUserRolesAndPermissions() {
    const result = await this.service.getUserRolesAndPermissions(this.ctx.uid);
    this.ctx.setSuccess(result);
  }

  async getUserPermissionCode() {
    const result = await this.service.getUserPermissionCode(this.ctx.uid);
    this.ctx.setSuccess(result);
  }

  _beforeAdd() {
    const { ctx } = this;
    let password = ctx.request.body.password;
    if (password) {
      password = ctx.helper.decryptString(password);
      ctx.request.body.password = ctx.helper.shaEcrypt(password);
    }
    return true;
  }
  _beforeUpdate() {
    delete this.ctx.request.body?.password;
    delete this.ctx.request.body?.username;
    return true;
  }
}

module.exports = userController;
