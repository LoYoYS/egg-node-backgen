const Subscription = require("egg").Subscription;

/**
 * 所有的定时任务都统一存放在 app/schedule 目录下，每一个文件都是一个独立的定时任务，可以配置定时任务的属性和要执行的方法。
 */
module.exports = class UpdateCache extends Subscription {
  static get schedule() {
    return {
      interval: "5s", //执行时间间隔
      disable: true, //是否禁用
      type: "worker", //worker表示一个进程运行、all表示全部进程运行
      immediate: true, //即刻执行
      env: ["prod"] //运行环境
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    // const { ctx } = this;
  }
};
