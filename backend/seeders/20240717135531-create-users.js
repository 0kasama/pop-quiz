'use strict';

const { hashPassword } = require('../libs/bcrypt.js');

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
      'users',
      [
        {
          name: 'Developer 1',
          email: 'dev1@mail.com',
          password: hashPassword('dev123'),
          role: 'admin',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'teacher 1',
          email: 'teacher1@mail.com',
          password: hashPassword('teacher123'),
          role: 'teacher',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'student 1',
          email: 'student1@mail.com',
          password: hashPassword('user123'),
          role: 'user',
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
    await queryInterface.bulkDelete('users', null, {});
  },
};
