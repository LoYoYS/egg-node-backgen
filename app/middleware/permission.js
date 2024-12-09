// 权限校验中间件
module.exports = (permissionCode) => {
  return async function filterPermission(ctx, next) {
    const userPermissions = await ctx.service.userService.getUserPermissionCode(ctx.uid);
    if (userPermissions.includes(permissionCode)) return await next();
    ctx.throw(403, "权限不足，请联系管理员。");
  };
};
