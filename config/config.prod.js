// 生产环境配置文件
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
    database: "egg-node-backend-prod",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "123456",
    define: {
      freezeTableName: true
    },
    timezone: "+08:00",
    logging: false
  };

  config.redis = {
    client: {
      host: "127.0.0.1",
      port: 6379,
      password: "",
      db: 1
    }
  };

  config.file = {
    basePath: "E:/egg-node-backend" // 本地文件存储路径
  };

  return {
    ...config
  };
};
