const { Op } = require("sequelize");
const Service = require("./BaseService.js");
module.exports = class loginLogService extends Service {
  constructor(context) {
    super(context);
    this.model = this.app.model.LoginLog;
  }

  async checkLoginFailNumber(username) {
    const record = await this.model.findAll({
      where: {
        username,
        status: -1,
        login_time: {
          [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)).getTime()
        }
      }
    });
    if (record.length > 5) return true;
    return false;
  }

  createLoginLog(status, msg) {
    const {
      ctx: { request }
    } = this;
    const record = {
      username: request.body.username,
      ip: request.ip ?? "",
      agent: request.header["user-agent"] ?? "",
      loginTime: new Date(),
      body: { ...request.body, message: msg },
      status
    };
    record.body = JSON.stringify(record.body);
    this.model.create(record);
  }
};
