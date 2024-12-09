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
      "user_role",
      [
        {
          id: "e8bc477b-8dc2-41ec-88af-5454416c685c",
          uid: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          role_id: "e8bc477b-8dc2-41ec-88af-5454416c685b",
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
    await queryInterface.bulkDelete("user_role", null, {});
  }
};
