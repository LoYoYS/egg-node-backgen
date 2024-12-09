/**
 * @description 服务应用路由配置，详情可查看：https://eggjs.org/zh-cn/basics/router.html
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;

  const validates = require("./validate");
  const apiLog = app.middleware.apiLog;
  const errorHandler = app.middleware.errorHandler();
  const jwt = app.middleware.decodeJWT(app.config.jwt);
  const permission = app.middleware.permission;
  const validate = app.middleware.validate;

  router.get("/", apiLog("访问首页"), controller.homeController.index);
  // 用户相关
  router.get("/api/user/captcha", apiLog("获取登录验证码"), errorHandler, controller.userController.generateCaptcha);
  router.post(
    "/api/user/login",
    apiLog("用户登录"),
    errorHandler,
    validate(validates.user.login),
    controller.userController.login
  );
  router.get("/api/user/getUserInfo", apiLog("获取用户信息"), errorHandler, jwt, controller.userController.getUserInfo);
  router.get(
    "/api/user/get/:id",
    apiLog("根据id获取用户信息"),
    errorHandler,
    jwt,
    permission("sys:user:query"),
    validate(validates.user.get),
    controller.userController.get
  );
  router.get(
    "/api/user/list",
    apiLog("获取用户列表"),
    errorHandler,
    jwt,
    permission("sys:user:query"),
    controller.userController.getList
  );
  router.post(
    "/api/user/add",
    apiLog("新增用户"),
    errorHandler,
    jwt,
    permission("sys:user:add"),
    validate(validates.user.add),
    controller.userController.add
  );
  router.post(
    "/api/user/update",
    apiLog("修改用户"),
    errorHandler,
    jwt,
    permission("sys:user:update"),
    validate(validates.user.update),
    controller.userController.update
  );
  router.post(
    "/api/user/updatepw",
    apiLog("修改用户密码"),
    errorHandler,
    jwt,
    permission("sys:user:updatepw"),
    validate(validates.user.updatepw),
    controller.userController.updatepw
  );
  router.post(
    "/api/user/delete",
    apiLog("删除用户"),
    errorHandler,
    jwt,
    permission("sys:user:delete"),
    validate(validates.user.delete),
    controller.userController.delete
  );
  // 角色相关
  router.get(
    "/api/role/get/:id",
    apiLog("根据id获取角色信息"),
    errorHandler,
    jwt,
    permission("sys:role:query"),
    validate(validates.role.get),
    controller.roleController.get
  );
  router.get(
    "/api/role/list",
    apiLog("获取角色列表"),
    errorHandler,
    jwt,
    permission("sys:role:query"),
    controller.roleController.findAndCountAll
  );
  router.post(
    "/api/role/add",
    apiLog("新增角色"),
    errorHandler,
    jwt,
    permission("sys:role:add"),
    validate(validates.role.add),
    controller.roleController.add
  );
  router.post(
    "/api/role/update",
    apiLog("修改角色"),
    errorHandler,
    jwt,
    permission("sys:role:update"),
    validate(validates.role.update),
    controller.roleController.update
  );
  router.post(
    "/api/role/delete",
    apiLog("删除角色"),
    errorHandler,
    jwt,
    permission("sys:role:delete"),
    validate(validates.role.delete),
    controller.roleController.delete
  );
  // 菜单相关
  router.get(
    "/api/menu/get/:id",
    apiLog("根据id获取菜单信息"),
    errorHandler,
    jwt,
    permission("sys:menu:query"),
    validate(validates.menu.get),
    controller.menuController.get
  );
  router.get(
    "/api/menu/list",
    apiLog("获取菜单列表"),
    errorHandler,
    jwt,
    permission("sys:menu:query"),
    controller.menuController.findAndCountAll
  );
  router.post(
    "/api/menu/add",
    apiLog("新增菜单"),
    errorHandler,
    jwt,
    permission("sys:menu:add"),
    validate(validates.menu.add),
    controller.menuController.add
  );
  router.post(
    "/api/menu/update",
    apiLog("修改菜单"),
    errorHandler,
    jwt,
    permission("sys:menu:update"),
    validate(validates.menu.update),
    controller.menuController.update
  );
  router.post(
    "/api/menu/delete",
    apiLog("删除菜单"),
    errorHandler,
    jwt,
    permission("sys:menu:delete"),
    validate(validates.menu.delete),
    controller.menuController.delete
  );
  // 用户操作日志
  router.get(
    "/api/log/list",
    apiLog("获取日志列表"),
    errorHandler,
    jwt,
    permission("sys:log:query"),
    controller.apiLogController.findAndCountAll
  );
  // 刷新token
  router.get("/api/token/refresh", apiLog("刷新token"), errorHandler, controller.jwtController.refreshToken);

  // 文件操作
  router.get(
    "/api/file/get/:id",
    apiLog("通过id获取文件信息"),
    errorHandler,
    jwt,
    validate(validates.file.get),
    controller.fileController.get
  );
  router.get("/api/file/list", apiLog("获取文件列表"), errorHandler, jwt, controller.fileController.findAndCountAll);
  router.post(
    "/api/file/update",
    apiLog("修改文件信息"),
    errorHandler,
    jwt,
    validate(validates.file.update),
    controller.fileController.update
  );
  router.post(
    "/api/file/delete",
    apiLog("删除文件"),
    errorHandler,
    jwt,
    validate(validates.file.delete),
    controller.fileController.delete
  );
  router.post("/api/file/upload", apiLog("上传文件"), errorHandler, jwt, controller.fileController.uploadFile);
  router.get("/api/file/download/:id", apiLog("下载文件"), errorHandler, jwt, controller.fileController.download);
  router.get("/api/file/preview/:id", apiLog("预览文件"), errorHandler, jwt, controller.fileController.preview);
};
