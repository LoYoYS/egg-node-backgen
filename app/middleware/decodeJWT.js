// 校验JWT中间件
module.exports = () => {
  return async function decodeJWT(ctx, next) {
    let token = ctx.request.header.authorization;
    if (!token) ctx.throw(401, "没有Bearer Token");
    token = ctx.query.token ? ctx.query.token : token.split(" ")[1];
    const data = ctx.service.jwtService.verifyAccessToken(token);
    ctx.uid = data?.id;
    await next();
  };
};
