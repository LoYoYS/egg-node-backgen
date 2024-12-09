"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { STRING, UUIDV4, INTEGER, DATE } = Sequelize;
    await queryInterface.createTable("role", {
      id: {
        type: STRING(36),
        primaryKey: true,
        allowNull: false,
        field: "id",
        defaultValue: UUIDV4
      },
      name: {
        type: STRING(50),
        allowNull: true,
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
        allowNull: true,
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
    await queryInterface.dropTable("role");
  }
};
