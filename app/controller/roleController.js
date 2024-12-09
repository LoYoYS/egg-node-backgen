const BaseController = require("./BaseController");
class menuController extends BaseController {
  constructor(context) {
    super(context);
    this.model = this.ctx.model.Role;
    this.service = this.service.roleService;
  }
}

module.exports = menuController;
