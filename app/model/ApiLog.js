module.exports = (app) => {
  const { UUIDV4, STRING, INTEGER, TEXT } = app.Sequelize;

  const ApiLog = app.model.define(
    "api_log",
    {
      id: {
        type: STRING(36),
        defaultValue: UUIDV4,
        allowNull: false,
        field: "id",
        primaryKey: true
      },
      uid: {
        type: STRING(36),
        allowNull: true,
        field: "uid",
        comment: "请求用户id"
      },
      url: {
        type: STRING(255),
        allowNull: true,
        field: "url",
        comment: "请求路径"
      },
      ip: {
        type: STRING(50),
        allowNull: true,
        field: "ip",
        comment: "请求ip"
      },
      agent: {
        type: STRING(255),
        allowNull: true,
        field: "agent",
        comment: "客户端"
      },
      requestType: {
        type: STRING(10),
        allowNull: true,
        field: "request_type",
        comment: "请求方式, GET、 POST、 PUT,、 DELETE"
      },
      action: {
        type: STRING(255),
        allowNull: true,
        field: "action",
        comment: "操作"
      },
      time: {
        type: INTEGER,
        allowNull: true,
        field: "time",
        comment: "请求耗时ms"
      },
      result: {
        type: INTEGER,
        allowNull: true,
        field: "result",
        comment: "请求结果,1 成功,0 失败"
      },
      body: {
        type: TEXT,
        allowNull: true,
        field: "body",
        comment: "body"
      }
    },
    {
      freezeTableName: true,
      timestamps: true,
      updatedAt: false, //不需要更新时间
      underscored: true // 启用下划线命名规则
    }
  );

  return ApiLog;
};
