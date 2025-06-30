'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      { name: 'Ana', lastName: 'Gomez', email: 'ana@email.com', password: '123456', rol: 2, status: 1 },
      { name: 'Luis', lastName: 'Perez', email: 'luis@email.com', password: '123456', rol: 3, status: 1 }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
