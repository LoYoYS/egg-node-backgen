"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { STRING, UUIDV4, INTEGER, DATE } = Sequelize;
    await queryInterface.createTable("permission", {
      id: {
        type: STRING(36),
        primaryKey: true,
        allowNull: false,
        field: "id",
        defaultValue: UUIDV4
      },
      parentId: {
        type: STRING(36),
        allowNull: true,
        field: "parent_id",
        comment: "父级Id"
      },
      description: {
        type: STRING(255),
        allowNull: true,
        field: "description",
        comment: "菜单、权限描述"
      },
      name: {
        type: STRING(50),
        allowNull: false,
        field: "name",
        comment: "菜单名称、权限名称"
      },
      routeName: {
        type: STRING(50),
        allowNull: true,
        field: "route_name",
        comment: "路由名称"
      },
      routePath: {
        type: STRING(255),
        allowNull: true,
        field: "route_path",
        comment: "路由路径"
      },
      componentPath: {
        type: STRING(255),
        allowNull: true,
        field: "component_path",
        comment: "组件路径"
      },
      icon: {
        type: STRING(50),
        allowNull: true,
        field: "icon",
        comment: "图标名称"
      },
      visible: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 1,
        field: "visible",
        comment: "是否可见:1可见、0不可见"
      },
      keepAlive: {
        type: INTEGER,
        allowNull: true,
        defaultValue: 0,
        field: "keep_alive",
        comment: "是否缓存:0不缓存、1缓存"
      },
      orderNumber: {
        type: INTEGER,
        allowNull: false,
        field: "order_number",
        comment: "显示顺序"
      },
      status: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 1,
        field: "status",
        comment: "菜单权限状态:0停用、1正常"
      },
      code: {
        type: STRING(50),
        allowNull: true,
        field: "code",
        comment: "权限标识符"
      },
      type: {
        type: INTEGER,
        allowNull: false,
        field: "type",
        comment: "类型，1:目录、2:菜单、3:按钮"
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
    await queryInterface.dropTable("permission");
  }
};
