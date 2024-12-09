const Service = require("./BaseService.js");
module.exports = class logApiService extends Service {
  constructor(context) {
    super(context);
    this.model = this.app.model.ApiLog;
  }

  async creatLog(requestTime = 0) {
    // 构建日记记录
    const record = {
      url: ctx.request.url,
      uid: ctx.uid ?? "",
      ip: ctx.request.ip ?? "",
      agent: ctx.request.header["user-agent"] ?? "",
      requestType: ctx.request.method?.toUpperCase() ?? "未知",
      action: action ?? "",
      time: requestTime,
      result: ctx.status >= 400 ? 0 : 1
    };
    if (record.requestType === "GET") {
      record.body = ctx.query ?? ctx.params ?? "";
    } else {
      record.body = ctx.request.body ?? "";
    }
    record.body = JSON.stringify(record.body);
    this.add(record);
  }
};
