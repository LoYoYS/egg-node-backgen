// 用户curd参数校验
module.exports = {
  login: {
    username: {
      type: "string",
      required: true, // 确保参数存在
      trim: true, // 去除前后空格
      allowEmpty: false // 确保参数不为空
    },
    password: {
      type: "string",
      required: true,
      trim: true,
      allowEmpty: false
    }
  },
  get: {
    id: {
      type: "string",
      required: true,
      trim: true,
      allowEmpty: false
    }
  },
  add: {
    username: {
      type: "string",
      required: true,
      trim: true,
      allowEmpty: false
    },
    password: {
      type: "string",
      required: true,
      trim: true,
      allowEmpty: false
    },
    name: {
      type: "string",
      required: false,
      trim: true,
      max: 15,
      min: 2,
      allowEmpty: true
    },
    phone: {
      type: "string",
      required: false,
      trim: true,
      max: 11,
      min: 11,
      allowEmpty: true
    },
    age: {
      type: "number",
      required: false,
      min: 0
    },
    type: {
      type: "number",
      required: false,
    },
    email: {
      type: "email",
      required: false
    },
    avatar: {
      type: "string",
      required: false,
      trim: true,
      allowEmpty: true
    },
    roles: {
      type: "array",
      required: false,
      itemType: "string",
      rule: { type: "string", allowEmpty: false }
    }
  },
  update: {
    id: {
      type: "string",
      required: true,
      trim: true,
      allowEmpty: false
    },
    name: {
      type: "string",
      required: false,
      trim: true,
      max: 15,
      min: 2,
      allowEmpty: true
    },
    phone: {
      type: "string",
      required: false,
      trim: true,
      max: 11,
      min: 11,
      allowEmpty: true
    },
    age: {
      type: "number",
      required: false,
      min: 0
    },
    type: {
      type: "number",
      required: false,
    },
    email: {
      type: "email",
      required: false
    },
    avatar: {
      type: "string",
      required: false,
      trim: true,
      allowEmpty: true
    },
    roles: {
      type: "array",
      required: false,
      itemType: "string",
      rule: { type: "string", allowEmpty: false }
    }
  },
  updatepw: {
    id: {
      type: "string",
      required: true,
      trim: true,
      allowEmpty: false
    },
    password: {
      type: "string",
      required: true,
      trim: true,
      allowEmpty: false
    }
  },
  delete: {
    id: {
      type: "string",
      required: true,
      trim: true,
      allowEmpty: false
    }
  }
};
