// 异常处理中间件
module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      const status = err.statusCode || err.status || 500;
      ctx.logger.error(err); // 记录错误日志
      ctx.setError(err, err.message, status, err.code);
    }
  };
};
