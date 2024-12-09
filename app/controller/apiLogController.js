const BaseController = require("./BaseController");

class apiLogController extends BaseController {
  constructor(context) {
    super(context);
    this.model = this.ctx.model.ApiLog;
    this.service = this.service.apiLogService;
  }
}

module.exports = apiLogController;
