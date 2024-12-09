// 参数校验中间件
module.exports = (options) => {
  return async function validate(ctx, next) {
    const validator = ctx.app.validator;
    const rules = options; // 从中间件配置中获取校验规则

    let validateData = null;
    if (ctx.request.method?.toUpperCase() === "GET") {
      validateData = Object.keys(ctx.query).length ? ctx.query : ctx.params;
    } else {
      validateData = ctx.request.body;
    }
    // 执行校验
    const errors = await validator.validate(rules, validateData);

    // 如果校验失败，返回错误响应并终止请求处理
    if (errors?.length > 0) {
      ctx.throw(422, "参数校验失败,请检查参数！", errors);
    }
    await next(); // 校验通过，继续处理请求
  };
};
