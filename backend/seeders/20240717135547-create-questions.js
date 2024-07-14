'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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
      "questions",
      [
        {
          quizId: 1,
          question: "Question 1-1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          quizId: 1,
          question: "Question 1-2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          quizId: 2,
          question: "Question 2-1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          quizId: 2,
          question: "Question 2-2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("questions", null, {});
  },
};
