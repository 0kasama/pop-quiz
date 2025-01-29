'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
      'answers',
      [
        {
          question_id: 1,
          answer: 'Answer 1-1',
          is_correct: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question_id: 1,
          answer: 'Answer 1-2',
          is_correct: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question_id: 2,
          answer: 'Answer 1-1',
          is_correct: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question_id: 2,
          answer: 'Answer 1-2',
          is_correct: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question_id: 3,
          answer: 'Answer 2-1',
          is_correct: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question_id: 3,
          answer: 'Answer 2-2',
          is_correct: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question_id: 4,
          answer: 'Answer 2-1',
          is_correct: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question_id: 4,
          answer: 'Answer 2-2',
          is_correct: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('answers', null, {});
  },
};
