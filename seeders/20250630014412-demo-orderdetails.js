'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('orderdetails', [
      { id: 1, orderId: 1, productId: 1, amount: 1, price: 500, status: 1 },
      { id: 2, orderId: 1, productId: 3, amount: 1, price: 30, status: 1 },
      { id: 3, orderId: 2, productId: 2, amount: 1, price: 20, status: 1 }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orderdetails', null, {});
  }
};
