const Service = require("./BaseService.js");
module.exports = class roleService extends Service {
  constructor(context) {
    super(context);
    this.model = this.app.model.Role;
  }

  async get(id) {
    const role = await this.model.findByPk(id, {
      include: [
        {
          model: this.app.model.Permission,
          as: "permissions",
          through: { attributes: [] },
        }
      ]
    });
    const newRole = JSON.parse(JSON.stringify(role));
    newRole.permissions = newRole.permissions.map((permission) => permission.id);
    return newRole;
  }

  async add(role) {
    const result = await this.model.create(role);
    if (result) {
      await this.updateRolePermissions(result.id, role.permissions);
    }
    return { msg: "角色新增成功!", data: result };
  }

  async update(role) {
    const oldRow = await this.model.findByPk(role.id);
    if (!oldRow) return { msg: `没有找到id为${role.id}的记录` };
    const result = await oldRow.update(role);
    if (result) {
      await this.updateRolePermissions(role.id, role.permissions);
    }
    return { msg: "角色更新成功!", data: result };
  }

  async delete(roleId) {
    const oldRow = await this.model.findByPk(roleId);
    if (!oldRow) return { msg: `没有找到id为${roleId}的记录`, code: 1 };
    const result = await oldRow.destroy();
    if (result) {
      this.app.model.RolePermission.destroy({
        where: {
          roleId
        }
      });
    }
    return { msg: "角色删除成功!", data: result };
  }

  async updateRolePermissions(roleId, permissions = []) {
    await this.app.model.RolePermission.destroy({
      where: {
        roleId
      }
    });
    for (const permissionId of permissions) {
      const permission = {
        roleId,
        permissionId,
        uidCreated: this.ctx.uid,
        uidUpdated: this.ctx.uid
      };
      await this.app.model.RolePermission.create(permission);
    }
  }
};
