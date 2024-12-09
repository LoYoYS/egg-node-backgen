const BaseController = require("./BaseController");
class roleController extends BaseController {
  constructor(context) {
    super(context);
    this.model = this.ctx.model.Permission;
    this.service = this.service.menuService;
  }
}

module.exports = roleController;
