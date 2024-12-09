"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { STRING, UUIDV4, DATE } = Sequelize;
    await queryInterface.createTable("user_role", {
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
        comment: "更新时间"
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("user_role");
  }
};
