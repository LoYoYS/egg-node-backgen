"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { STRING, UUIDV4, JSON, INTEGER, DATE } = Sequelize;
    await queryInterface.createTable("user", {
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
        comment: "用户类型"
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
      },
      createdAt: {
        type: DATE,
        allowNull: true,
        field: "created_at",
        comment: "创建时间"
      },
      updatedAt: {
        type: DATE,
        allowNull: true,
        field: "updated_at",
        comment: "更新时间",
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("user");
  }
};
