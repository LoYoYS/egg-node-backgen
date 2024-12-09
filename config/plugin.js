// 框架插件配置文件
module.exports = {
  static: {
    enable: true
  },

  sequelize: {
    enable: true,
    package: "egg-sequelize"
  },

  jwt: {
    enable: true,
    package: "egg-jwt"
  },

  cors: {
    enable: true,
    package: "egg-cors"
  },

  validate: {
    enable: true,
    package: "egg-validate"
  },

  ejs: {
    enable: true,
    package: "egg-view-ejs"
  },

  redis: {
    enable: true,
    package: "egg-redis"
  }

};
