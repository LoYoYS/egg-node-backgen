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
      "user",
      [
        {
          id: "e8bc477b-8dc2-41ec-88af-5454416c685a",
          username: "root",
          password: "481f6cc0511143ccdd7e2d1b1b94faf0a700a8b49cd13922a70b5ae28acaa8c5", //YHNTGBRFVEDCWSXQAZ
          email: "123456789@qq.com",
          name: "超级管理员",
          phone: "12345678900",
          age: 18,
          type: 1,
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('User', null, {});
     */
    await queryInterface.bulkDelete("user", null, {});
  }
};
