// 角色参数校验
module.exports = {
  get: {
    id: {
      type: "string",
      required: true,
      trim: true,
      allowEmpty: false
    }
  },
  add: {
    name: {
      type: "string",
      required: true,
      trim: true,
      allowEmpty: false
    },
    code: {
      type: "string",
      required: true,
      trim: true,
      allowEmpty: false
    },
    status: {
      type: "enum",
      required: true,
      values: [0, 1]
    },
    permissions: {
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
    },
    code: {
      type: "string",
      required: false,
      trim: true,
    },
    status: {
      type: "enum",
      required: true,
      values: [0, 1]
    },
    permissions: {
      type: "array",
      required: false,
      itemType: "string",
      rule: { type: "string", allowEmpty: false }
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
