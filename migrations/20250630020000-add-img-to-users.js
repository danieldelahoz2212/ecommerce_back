"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "img", {
      type: Sequelize.TEXT("long"),
      allowNull: true,
      comment: "Imagen de usuario en base64 o URL"
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "img");
  }
};
