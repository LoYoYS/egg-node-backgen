const path = require("path");

// 框架默认配置文件，具体详情查阅 https://www.eggjs.org/zh-CN/basics/config
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // cookie安全密钥
  config.keys = appInfo.name + "_1649331929436_5124";

  // 数据库配置
  config.sequelize = {
    dialect: "mysql", // support: mysql, mariadb, postgres, mssql
    database: "egg-node-backend",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "123456",
    define: {
      freezeTableName: true
    },
    timezone: "+08:00", // 时区
    logging: false // 是否打印数据库日志
  };

  // redis配置
  config.redis = {
    client: {
      host: "127.0.0.1",
      port: 6379,
      password: "",
      db: 1
    }
  };

  // 关闭安全威胁csrf的防范
  config.security = {
    csrf: {
      enable: false
    }
  };

  // 日志配置
  config.logger = {
    consoleLevel: 'NONE', //不在控制台输出日志
  };

  // 配置cors
  config.cors = {
    origin: "*",
    credentials: true, //允许携带cookie
    allowMethods: "*",
    maxAge: 6000 // 指定本次预检请求的有效期，单位为秒。
  };

  // jwt token密钥
  config.jwt = {
    secret: "egg-node-backend",
    accessTokenExpireTime: '1h',
    refreshTokenExpireTime: '7d',
  };

  // 文件类型
  config.multipart = {
    // mode: "file",
    mode: "stream",
    whitelist: (filename) => {
      // 使用正则表达式来检查文件后缀
      const regex = /\.(jpg|jpeg|png|gif|bmp|tiff|svg|xls|xlsx|doc|docx|pdf|mp4|avi|mov|wmv|flv|txt)$/i;
      return regex.test(path.extname(filename));
    },
    fileSize: "5gb"
  };

  // 请求体解析
  config.bodyParser = {
    jsonLimit: "100mb",
    formLimit: "1gb"
  };

  // 全局错误拦截
  config.onerror = {
    all(err, ctx) {
      ctx.setError(void 0, err.message, err.status);
    }
  };

  // 配置参数校验器，基于parameter
  config.validate = {
    convert: true // 对参数可以使用convertType规则进行类型转换
    // validateRoot: false,   // 限制被验证值必须是一个对象。
  };

  // 全局中间件
  // config.middleware = ["errorHandler"];

  // 本地文件存放路径配置
  config.file = {
    basePath: "E:/egg-node-backend",
    downloadPath: "E:/egg-node-backend/download",
    uploadPath: "E:/egg-node-backend/upload"
  };

  config.view = {
    mapping: {
      ".ejs": "ejs"
    }
  };

  return {
    ...config
  };
};
