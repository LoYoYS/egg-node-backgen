module.exports = (app) => {
  const { UUIDV4, STRING } = app.Sequelize;

  const Model1 = app.model.define(
    "role_permission",
    {
      id: {
        type: STRING(50),
        defaultValue: UUIDV4,
        allowNull: false,
        field: "id",
        primaryKey: true
      },
      permissionId: {
        type: STRING(36),
        allowNull: false,
        field: "permission_id",
        comment: "权限id"
      },
      roleId: {
        type: STRING(36),
        allowNull: false,
        field: "role_id",
        comment: "角色Id"
      },
      uidCreated: {
        type: STRING(36),
        allowNull: true,
        field: "uid_created",
        comment: "创建用户Id"
      },
      uidUpdated: {
        type: STRING(36),
        allowNull: true,
        field: "uid_updated",
        comment: "修改用户Id"
      }
    },
    {
      freezeTableName: true,
      timestamps: true,
      paranoid: false,
      underscored: true
    }
  );

  return Model1;
};
