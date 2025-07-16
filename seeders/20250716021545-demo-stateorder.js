"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "state_order",
      [
        { name: "Pendiente", state: 1 },
        { name: "Enviado", state: 1 },
        { name: "Entregado", state: 1 },
        { name: "Cancelado", state: 1 },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("state_order", null, {});
  },
};
