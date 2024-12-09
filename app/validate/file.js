// 用户curd参数校验
module.exports = {
  get: {
    id: {
      type: "string",
      required: true,
      trim: true,
      allowEmpty: false
    }
  },
  update: {
    id: {
      type: "string",
      required: true,
      trim: true,
      allowEmpty: false
    },
    fileName: {
      type: "string",
      required: false,
      trim: true,
      allowEmpty: false
    },
    size: {
      type: "number",
      required: false
    },
    uri: {
      type: "string",
      required: false,
      trim: true,
      allowEmpty: false
    },
    mime: {
      type: "string",
      required: false,
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
