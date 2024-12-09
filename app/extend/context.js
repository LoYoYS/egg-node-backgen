// context对象扩展,this指向ctx
module.exports = {
  setSuccess(data, message = "请求成功", code = 0, status = 200) {
    const res = {
      code: code ?? 0,
      data,
      message
    };
    this.status = status ?? 200;
    this.body = res;
  },

  setError(data, message = "请求失败", status = 500, code = 1) {
    const res = {
      code: code ?? 1,
      data,
      message
    };
    this.status = status ?? 500;
    this.body = res;
  }
};
