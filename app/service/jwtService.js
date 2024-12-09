const Service = require("egg").Service;
module.exports = class jwtService extends Service {
  /**
   * @description 签发token
   * @param {object} data 载荷数据
   * @return {object} accessToken, refreshToken
   */
  createToken(data = {}) {
    const {
      app,
      config: { jwt }
    } = this;

    const accessToken = app.jwt.sign(data, jwt.secret, { expiresIn: jwt.accessTokenExpireTime });
    const refreshToken = app.jwt.sign(data, jwt.secret, { expiresIn: jwt.refreshTokenExpireTime });
    return { accessToken, refreshToken };
  }

  /**
   * @description 验证token
   * @param {string} token token
   * @return {object} payload
   * @throws {Error} token验证失败
   */
  verifyAccessToken(token) {
    const { app } = this;
    try {
      const data = app.jwt.verify(token, app.config.jwt.secret);
      return data;
    } catch (error) {
      ctx.throw(error.status, "accessToken错误或已失效!", error);
    }
  }

  /**
   * @description 刷新token
   * @param {string} refreshToken refreshToken
   * @return {object} accessToken, refreshToken
   */
  refreshToken(refreshToken) {
    const { app } = this;
    try {
      const data = app.jwt.verify(refreshToken, app.config.jwt.secret);
      return this.createToken(data);
    } catch (error) {
      ctx.throw(error.status, "Token已过期,请重新登入!", error);
    }
  }
};
