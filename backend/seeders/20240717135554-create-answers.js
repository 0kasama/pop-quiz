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
      "answers",
      [
        {
          questionId: 1,
          answer: "Answer 1-1",
          isCorrect: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionId: 1,
          answer: "Answer 1-2",
          isCorrect: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionId: 2,
          answer: "Answer 1-1",
          isCorrect: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionId: 2,
          answer: "Answer 1-2",
          isCorrect: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionId: 3,
          answer: "Answer 2-1",
          isCorrect: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionId: 3,
          answer: "Answer 2-2",
          isCorrect: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionId: 4,
          answer: "Answer 2-1",
          isCorrect: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          questionId: 4,
          answer: "Answer 2-2",
          isCorrect: false,
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
    await queryInterface.bulkDelete("answers", null, {});
  },
};
