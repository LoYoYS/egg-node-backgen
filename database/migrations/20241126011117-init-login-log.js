"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { STRING, UUIDV4, INTEGER, DATE, TEXT } = Sequelize;
    await queryInterface.createTable("login_log", {
      id: {
        type: STRING(50),
        defaultValue: UUIDV4,
        allowNull: false,
        field: "id",
        primaryKey: true
      },
      username: {
        type: STRING(50),
        allowNull: false,
        field: "username",
        comment: "用户账号"
      },
      ip: {
        type: STRING(50),
        allowNull: true,
        field: "ip",
        comment: "登录ip"
      },
      agent: {
        type: STRING(255),
        allowNull: true,
        field: "agent",
        comment: "登入客户端"
      },
      status: {
        type: INTEGER,
        allowNull: true,
        field: "status",
        comment: "0 未知，1 成功，-1 失败"
      },
      loginTime: {
        type: DATE,
        allowNull: true,
        field: "login_time",
        comment: "登录时间"
      },
      body: {
        type: TEXT,
        allowNull: true,
        field: "body",
        comment: "登入信息"
      },
      createdAt: {
        type: DATE,
        allowNull: true,
        field: "created_at",
        comment: "创建时间"
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("login_log");
  }
};
