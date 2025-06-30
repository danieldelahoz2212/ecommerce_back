'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('orders', [
      { id: 1, idUser: 1, totalPrice: 550, statusOrder: 1, payment: 'tarjeta', status: 1 },
      { id: 2, idUser: 2, totalPrice: 20, statusOrder: 1, payment: 'efectivo', status: 1 }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orders', null, {});
  }
};
