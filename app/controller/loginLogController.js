const BaseController = require("./BaseController");
class loginLogController extends BaseController {
  constructor(context) {
    super(context);
    this.service = this.service.loginLogService;
  }
}

module.exports = loginLogController;
