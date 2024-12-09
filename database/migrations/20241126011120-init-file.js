"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { STRING, UUIDV4, DATE, DOUBLE, JSON } = Sequelize;
    await queryInterface.createTable("file", {
      id: {
        type: STRING(50),
        defaultValue: UUIDV4,
        allowNull: false,
        field: "id",
        primaryKey: true
      },
      fileName: {
        type: STRING(255),
        allowNull: true,
        field: "file_name",
        comment: "文件名"
      },
      size: {
        type: DOUBLE,
        allowNull: true,
        field: "size",
        comment: "文件大小"
      },
      uri: {
        type: STRING(255),
        allowNull: true,
        field: "uri",
        comment: "文件路径"
      },
      mime: {
        type: STRING(255),
        allowNull: true,
        field: "mime",
        comment: "文件类型"
      },
      props: {
        type: JSON,
        allowNull: true,
        field: "props",
        comment: "其它属性"
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
    await queryInterface.dropTable("file");
  }
};
