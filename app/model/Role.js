module.exports = (app) => {
  const { UUIDV4, STRING, INTEGER } = app.Sequelize;

  const Role = app.model.define(
    "role",
    {
      id: {
        type: STRING(36),
        primaryKey: true,
        allowNull: false,
        field: "id",
        defaultValue: UUIDV4
      },
      name: {
        type: STRING(50),
        allowNull: false,
        field: "name",
        comment: "名称"
      },
      code: {
        type: STRING(50),
        allowNull: false,
        field: "code",
        comment: "角色标识符"
      },
      status: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 1,
        field: "status",
        comment: "角色状态：1启用，0禁用"
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
  // 设置模型关联
  Role.associate = () => {
    app.model.Role.belongsToMany(app.model.User, {
      through: app.model.UserRole,
      foreignKey: "roleId",
      otherKey: "uid",
      constraints: false,
      as: "users",
      onDelete: 'CASCADE',
    });
    app.model.Role.belongsToMany(app.model.Permission, {
      through: app.model.RolePermission,
      foreignKey: "roleId",
      otherKey: "permissionId",
      constraints: false,
      as: "permissions",
      onDelete: 'CASCADE',
    });
  };
  return Role;
};
