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
    parentId: {
      type: "string",
      required: false,
      trim: true,
      allowEmpty: false
    },
    name: {
      type: "string",
      required: true,
      trim: true,
      allowEmpty: false
    },
    routeName: {
      type: "string",
      required: false,
      trim: true,
    },
    routePath: {
      type: "string",
      required: false,
      trim: true,
    },
    componentPath: {
      type: "string",
      required: false,
      trim: true,
    },
    visible: {
      type: "enum",
      required: true,
      values: [0, 1]
    },
    keepAlive: {
      type: "enum",
      required: false,
      values: [0, 1]
    },
    orderNumber: {
      type: "number",
      required: true,
    },
    status: {
      type: "enum",
      required: true,
      values: [0, 1]
    },
    code: {
      type: "string",
      required: false,
      trim: true,
    },
    type: {
      type: "number",
      required: true,
    },
  },
  update: {
    id: {
      type: "string",
      required: true,
      trim: true,
      allowEmpty: false
    },
    parentId: {
      type: "string",
      required: false,
      trim: true,
      allowEmpty: false
    },
    name: {
      type: "string",
      required: true,
      trim: true,
      allowEmpty: false
    },
    routeName: {
      type: "string",
      required: false,
      trim: true,
    },
    routePath: {
      type: "string",
      required: false,
      trim: true,
    },
    componentPath: {
      type: "string",
      required: false,
      trim: true,
    },
    visible: {
      type: "enum",
      required: true,
      values: [0, 1]
    },
    keepAlive: {
      type: "enum",
      required: false,
      values: [0, 1]
    },
    orderNumber: {
      type: "number",
      required: true,
    },
    status: {
      type: "enum",
      required: true,
      values: [0, 1]
    },
    code: {
      type: "string",
      required: false,
      trim: true,
    },
    type: {
      type: "number",
      required: true,
    },
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
