const { performance } = require("perf_hooks");
// 日志中间件
module.exports = (action) => {
  return async function createLog(ctx, next) {
    const start = performance.now();
    await next(); // 等待其他操作完成
    const end = performance.now();
    const requestTime = end - start; //请求耗时

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
    ctx.service.apiLogService.add(record);
  };
};
