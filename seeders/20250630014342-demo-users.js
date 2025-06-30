'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      { id: 1, name: 'Daniel', lastName: 'De La Hoz', email: 'admin@email.com', password: '123456', rol: 1, status: 1 },
      { id: 2, name: 'Ana', lastName: 'Gomez', email: 'ana@email.com', password: '123456', rol: 2, status: 1 },
      { id: 3, name: 'Luis', lastName: 'Perez', email: 'luis@email.com', password: '123456', rol: 3, status: 1 }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
