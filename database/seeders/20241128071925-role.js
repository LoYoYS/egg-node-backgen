"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "role",
      [
        {
          id: "e8bc477b-8dc2-41ec-88af-5454416c685b",
          name: "超级管理员",
          code: "ADMIN:SUPER",
          status: 1,
          uid_created: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          uid_updated: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("role", null, {});
  }
};
