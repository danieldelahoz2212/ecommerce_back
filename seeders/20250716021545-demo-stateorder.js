'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
await queryInterface.bulkInsert('state_order', [
    { id: 1, name: 'Pendiente', state: 1 },
    { id: 2, name: 'Enviado', state: 2 },
    { id: 3, name: 'Entregado', state: 3 },
    { id: 4, name: 'Cancelado', state: 4 }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('state_order', null, {});
  }
};
