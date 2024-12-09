const CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require("uuid");
const dayjs = require("dayjs");
const svgCaptcha = require("svg-captcha");

const customEncryptRules = {
  a: "!01",
  b: "@02",
  c: "#03",
  d: "$04",
  e: "%05",
  f: "^06",
  g: "&07",
  h: "*08",
  i: "(09",
  j: ")10",
  k: "!11",
  l: "@12",
  m: "#13",
  n: "$14",
  o: "%15",
  p: "^16",
  q: "&17",
  r: "*18",
  s: "(19",
  t: ")20",
  u: "!21",
  v: "@22",
  w: "#23",
  x: "$24",
  y: "%25",
  z: "^26",
  1: "QAZ",
  2: "WSX",
  3: "EDC",
  4: "RFV",
  5: "TGB",
  6: "YHN",
  7: "UJM",
  8: "IJN",
  9: "OKM",
  0: "PLM"
};

// helper对象扩展,this指向helper对象
module.exports = {
  // 密码MD5加密
  md5Ecrypt(password) {
    return CryptoJS.MD5(password).toString();
  },

  //sha256加密
  shaEcrypt(string) {
    return CryptoJS.SHA256(string).toString();
  },

  // 获取uuid
  uuid() {
    return uuidv4();
  },

  // 自定义解密函数
  decryptString(str) {
    let newStr = "";
    const keys = Object.keys(customEncryptRules);
    for (let index = 0; index < str.length; index = index + 3) {
      const key = str.substring(index, index + 3);
      newStr += keys.find((s) => customEncryptRules[s] === key) || str[index];
    }
    return newStr;
  },

  // 字符串或数字转日期
  stringOrIntToDate(param) {
    if (!param) return null;
    const result = Number(param) ? new Date(Number(param)) : new Date(param);
    return result;
  },

  // 休眠函数
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  // 时间格式化
  formatDate(value, formatter = "YYYY-MM-DD") {
    if (!value) return;
    const result = dayjs(value).format(formatter);
    return result;
  },

  // 获取星期
  getDay() {
    const hash = {
      0: "日",
      1: "一",
      2: "二",
      3: "三",
      4: "四",
      5: "五",
      6: "六"
    };
    return hash[dayjs().day()];
  },

  // 获取随机颜色值
  getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },

  // 创建验证码
  createCaptcha() {
    const captcha = svgCaptcha.create({
      size: 4, // 验证码长度
      ignoreChars: "0o1i", // 验证码字符中排除 0o1i
      noise: 2, // 噪声线条数
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      background: this.getRandomColor() // 背景颜色
    });
    return captcha;
  },

  // 对象数组去重
  uniqueObjectsByProperty(array, property = 'id') {
    const seen = new Map();
    return array.filter(item => {
      if (!seen.has(item[property])) {
        seen.set(item[property], true);
        return true;
      }
      return false;
    });
  }
};
