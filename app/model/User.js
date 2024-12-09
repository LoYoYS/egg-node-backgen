module.exports = (app) => {
  const { STRING, UUIDV4, JSON, INTEGER } = app.Sequelize;

  const User = app.model.define(
    "user",
    {
      id: {
        type: STRING(36),
        primaryKey: true,
        allowNull: false,
        field: "id",
        defaultValue: UUIDV4
      },
      username: {
        type: STRING(36),
        allowNull: false,
        field: "username",
        comment: "用户名",
        unique: true
      },
      password: {
        type: STRING(255),
        allowNull: false,
        field: "password",
        comment: "密码"
      },
      name: {
        type: STRING(15),
        field: "name",
        comment: "姓名"
      },
      phone: {
        type: STRING(20),
        field: "phone",
        comment: "电话号码"
      },
      email: {
        type: STRING(20),
        field: "email",
        comment: "邮箱"
      },
      age: {
        type: INTEGER,
        field: "age",
        comment: "年龄"
      },
      type: {
        type: INTEGER,
        field: "type",
        comment: "用户类型",
        defaultValue: 0
      },
      avatar: {
        type: STRING(255),
        field: "avatar",
        comment: "头像url"
      },
      props: {
        type: JSON,
        field: "props",
        comment: "其他属性"
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
      underscored: true
    }
  );

  // 设置模型关联,将用户和角色通过用户角色表关联起来
  User.associate = () => {
    app.model.User.belongsToMany(app.model.Role, {
      through: app.model.UserRole,
      foreignKey: "uid",
      otherKey: "roleId",
      constraints: false, //不数据库中创建实际的外键关联
      as: "roles",
      onDelete: "CASCADE"
    });
  };

  return User;
};
