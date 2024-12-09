const Controller = require("egg").Controller;

class jwtController extends Controller {
  constructor(context) {
    super(context);
    this.service = this.service.jwtService;
  }

  refreshToken() {
    const { ctx } = this;
    const refreshToken = ctx.request.header.Authorization;
    const result = this.service.refreshToken(refreshToken);
    ctx.setSuccess(result, "Token刷新成功!");
  }
}

module.exports = jwtController;
