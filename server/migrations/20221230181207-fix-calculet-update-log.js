"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0;", {
      type: Sequelize.QueryTypes.RAW,
    });

    await queryInterface.changeColumn("calculet_update_log", "calculet_id", {
      type: Sequelize.UUID,
      allowNull: false,
    });

    await queryInterface.changeColumn("calculet_update_log", "update_date", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });
    await queryInterface.renameColumn(
      "calculet_update_log",
      "update_date",
      "created_at"
    );
    await queryInterface.changeColumn("calculet_update_log", "created_at", {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
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

    await queryInterface.changeColumn("calculet_update_log", "calculet_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn("calculet_update_log", "created_at", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });
    await queryInterface.renameColumn(
      "calculet_update_log",
      "created_at",
      "update_date"
    );
    await queryInterface.changeColumn("calculet_update_log", "update_date", {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    });

    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1;", {
      type: Sequelize.QueryTypes.RAW,
    });
  },
};
