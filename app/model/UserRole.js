module.exports = (app) => {
  const { UUIDV4, STRING} = app.Sequelize

  const UserRole = app.model.define(
    "user_role",
    {
      id: {
        type: STRING(36),
        primaryKey: true,
        allowNull: false,
        field: "id",
        defaultValue: UUIDV4
      },
      uid: {
        type: STRING(36),
        allowNull: false,
        field: "uid",
        comment: "用户id"
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
  )
  return UserRole
}
