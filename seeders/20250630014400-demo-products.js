'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      { id: 1, name: 'Laptop', description: 'Laptop básica', price: 500, category: 1, stock: 10, img: 'laptop.jpg', status: 1 },
      { id: 2, name: 'Camiseta', description: 'Camiseta de algodón', price: 20, category: 2, stock: 50, img: 'camiseta.jpg', status: 1 },
      { id: 3, name: 'Libro JS', description: 'Libro de JavaScript', price: 30, category: 3, stock: 25, img: 'libro.jpg', status: 1 }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
