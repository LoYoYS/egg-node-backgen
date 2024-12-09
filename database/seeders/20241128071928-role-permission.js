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
      "role_permission",
      [
        {
          id: "e8bc477b-8dc2-41ec-88a1-5454416c685a",
          role_id: "e8bc477b-8dc2-41ec-88af-5454416c685b",
          permission_id: "e8bc477b-8dc2-41ec-88af-5454416c685d",
          uid_created: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          uid_updated: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "e8bc477b-8dc2-41ec-88a2-5454416c685a",
          role_id: "e8bc477b-8dc2-41ec-88af-5454416c685b",
          permission_id: "e8bc477b-8dc2-41ec-88af-5454416c685e",
          uid_created: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          uid_updated: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "e8bc477b-8dc2-41ec-88a3-5454416c685a",
          role_id: "e8bc477b-8dc2-41ec-88af-5454416c685b",
          permission_id: "e8bc477b-8dc2-41ec-88af-5454416c685f",
          uid_created: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          uid_updated: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "e8bc477b-8dc2-41ec-88a4-5454416c685a",
          role_id: "e8bc477b-8dc2-41ec-88af-5454416c685b",
          permission_id: "e8bc477b-8dc2-41ec-88af-5454416c685g",
          uid_created: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          uid_updated: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "e8bc477b-8dc2-41ec-88a5-5454416c685a",
          role_id: "e8bc477b-8dc2-41ec-88af-5454416c685b",
          permission_id: "e8bc477b-8dc2-41ec-88af-5454416c685h",
          uid_created: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          uid_updated: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "e8bc477b-8dc2-41ec-88a6-5454416c685a",
          role_id: "e8bc477b-8dc2-41ec-88af-5454416c685b",
          permission_id: "e8bc477b-8dc2-41ec-88af-5454416c685i",
          uid_created: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          uid_updated: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "e8bc477b-8dc2-41ec-88a7-5454416c685a",
          role_id: "e8bc477b-8dc2-41ec-88af-5454416c685b",
          permission_id: "e8bc477b-8dc2-41ec-88af-5454416c685j",
          uid_created: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          uid_updated: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "e8bc477b-8dc2-41ec-88a8-5454416c685a",
          role_id: "e8bc477b-8dc2-41ec-88af-5454416c685b",
          permission_id: "e8bc477b-8dc2-41ec-88af-5454416c686a",
          uid_created: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          uid_updated: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "e8bc477b-8dc2-41ec-88a9-5454416c685a",
          role_id: "e8bc477b-8dc2-41ec-88af-5454416c685b",
          permission_id: "e8bc477b-8dc2-41ec-88af-5454416c686b",
          uid_created: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          uid_updated: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "e8bc477b-8dc2-41ec-88b1-5454416c685a",
          role_id: "e8bc477b-8dc2-41ec-88af-5454416c685b",
          permission_id: "e8bc477b-8dc2-41ec-88af-5454416c686c",
          uid_created: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          uid_updated: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "e8bc477b-8dc2-41ec-88b2-5454416c685a",
          role_id: "e8bc477b-8dc2-41ec-88af-5454416c685b",
          permission_id: "e8bc477b-8dc2-41ec-88af-5454416c686d",
          uid_created: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          uid_updated: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "e8bc477b-8dc2-41ec-88b3-5454416c685a",
          role_id: "e8bc477b-8dc2-41ec-88af-5454416c685b",
          permission_id: "e8bc477b-8dc2-41ec-88af-5454416c686e",
          uid_created: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          uid_updated: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "e8bc477b-8dc2-41ec-88b4-5454416c685a",
          role_id: "e8bc477b-8dc2-41ec-88af-5454416c685b",
          permission_id: "e8bc477b-8dc2-41ec-88af-5454416c687a",
          uid_created: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          uid_updated: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "e8bc477b-8dc2-41ec-88b5-5454416c685a",
          role_id: "e8bc477b-8dc2-41ec-88af-5454416c685b",
          permission_id: "e8bc477b-8dc2-41ec-88af-5454416c687b",
          uid_created: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          uid_updated: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "e8bc477b-8dc2-41ec-88b6-5454416c685a",
          role_id: "e8bc477b-8dc2-41ec-88af-5454416c685b",
          permission_id: "e8bc477b-8dc2-41ec-88af-5454416c687c",
          uid_created: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          uid_updated: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "e8bc477b-8dc2-41ec-88b7-5454416c685a",
          role_id: "e8bc477b-8dc2-41ec-88af-5454416c685b",
          permission_id: "e8bc477b-8dc2-41ec-88af-5454416c687d",
          uid_created: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          uid_updated: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "e8bc477b-8dc2-41ec-88b8-5454416c685a",
          role_id: "e8bc477b-8dc2-41ec-88af-5454416c685b",
          permission_id: "e8bc477b-8dc2-41ec-88af-5454416c687e",
          uid_created: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          uid_updated: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "e8bc477b-8dc2-41ec-88b9-5454416c685a",
          role_id: "e8bc477b-8dc2-41ec-88af-5454416c685b",
          permission_id: "e8bc477b-8dc2-41ec-88af-5454416c688a",
          uid_created: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          uid_updated: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "e8bc477b-8dc2-41ec-88c1-5454416c685a",
          role_id: "e8bc477b-8dc2-41ec-88af-5454416c685b",
          permission_id: "e8bc477b-8dc2-41ec-88af-5454416c688b",
          uid_created: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          uid_updated: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          created_at: new Date(),
          updated_at: new Date()
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("role_permission", null, {});
  }
};
