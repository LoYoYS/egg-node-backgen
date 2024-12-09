// const path = require('path');
/**
 * 自定义启动类
 */
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但还并未生效
    // 这是应用层修改配置的最后机会
    // 注意：此函数只支持同步调用
    // 例如：参数中的密码是加密的，在此处进行解密
    // this.app.config.mysql.password = decrypt(this.app.config.mysql.password);
  }

  configDidLoad() {
    // 配置文件已加载完毕
  }

  didLoad() {
    // 所有配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义服务

    // 例如：加载自定义目录
    /* this.app.loader.loadToContext(path.join(__dirname, "app/tasks"), "tasks", {
      fieldClass: "tasksClasses"
    }); */

    // 加载所有的自定义校验规则
    // const directory = path.join(__dirname, "app/validate");
    // this.app.loader.loadToApp(directory, "validate");
  }

  async willReady() {
    // 所有插件已启动完毕，但应用整体尚未 ready
    // 可进行数据初始化等操作，这些操作成功后才启动应用
    // 例如：更新数据库,此种方式更新数据库可能会对数据库造成破坏性操作，不建议使用该方式，建议使用Migrations来进行数据库迁移更新，
    // await this.app.model.sync({alter: true});
    // 项目已经配置好Migrations等相关文件，具体可查看 database文件夹以及package.json文件配置的运行命令
  }

  async didReady() {
    // 应用已启动完毕
    // const ctx = await this.app.createAnonymousContext(); // 获取ctx上下文对象
  }

  async serverDidReady() {
    // http/https 服务器已启动，开始接收外部请求
    // 此时可以从 app.server 获取 server 实例
  }

  beforeClose() {
    // 应用即将关闭
  }
}

module.exports = AppBootHook;
