"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // add calculet_record table
    await queryInterface.createTable("calculet_record", {
      calculet_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      input: {
        type: Sequelize.STRING(2184),
        allowNull: true,
      },
      output: {
        type: Sequelize.STRING(2184),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("calculet_record");
  },
};
