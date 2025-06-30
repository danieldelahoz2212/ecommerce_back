'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      { id: 1, rol: 'admin', status: 1 },
      { id: 2, rol: 'vendedor', status: 1 },
      { id: 3, rol: 'cliente', status: 1 }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
