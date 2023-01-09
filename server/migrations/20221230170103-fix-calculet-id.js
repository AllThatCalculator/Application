"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0;", {
      type: Sequelize.QueryTypes.RAW,
    });

    await queryInterface.changeColumn("calculet_count", "calculet_id", {
      type: Sequelize.UUID,
      allowNull: false,
    });

    await queryInterface.changeColumn("calculet_statistics", "calculet_id", {
      type: Sequelize.UUID,
      allowNull: false,
    });

    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1;", {
      type: Sequelize.QueryTypes.RAW,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0;", {
      type: Sequelize.QueryTypes.RAW,
    });

    await queryInterface.changeColumn("calculet_count", "calculet_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn("calculet_statistics", "calculet_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1;", {
      type: Sequelize.QueryTypes.RAW,
    });
  },
};
