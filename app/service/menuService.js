const Service = require("./BaseService.js");
module.exports = class menuService extends Service {
  constructor(context) {
    super(context);
    this.model = this.app.model.Permission;
  }

  async delete(menuId) {
    const oldRow = await this.model.findByPk(menuId);
    if (!oldRow) return { msg: `没有找到id为${menuId}的记录`, code: 1 };
    const result = await oldRow.destroy();
    if (result) {
      this.app.model.RolePermission.destroy({
        where: {
          permissionId: menuId
        }
      });
    }
    return { msg: "菜单删除成功!", data: result };
  }
};
