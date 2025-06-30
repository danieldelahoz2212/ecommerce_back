"use strict";

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_images', [
      {
        product_id: 1,
        img: null,
        position: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 1,
        img: null,
        position: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 2,
        img: null,
        position: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_images', null, {});
  }
};
