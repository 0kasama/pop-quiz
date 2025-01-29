'use strict';

const crypto = require('crypto');

const generateSlug = () => {
  return crypto.randomBytes(3).toString('hex');
};

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
      'quizzes',
      [
        {
          user_id: 2,
          title: 'Quiz 1',
          slug: generateSlug(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          title: 'Quiz 2',
          slug: generateSlug(),
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
    await queryInterface.bulkDelete('quizzes', null, {});
  },
};
