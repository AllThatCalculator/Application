"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // to avoid constraint, set foreign key not use -> change column -> set foreign key use again
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0;", {
      type: Sequelize.QueryTypes.RAW,
    });
    await queryInterface.changeColumn("calculet_info", "id", {
      type: Sequelize.UUID,
      allowNull: false,
    });

    // to avoid default value, first delete default value -> rename -> add default value
    await queryInterface.changeColumn("calculet_info", "birthday", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });
    await queryInterface.renameColumn(
      "calculet_info",
      "birthday",
      "created_at"
    );
    await queryInterface.changeColumn("calculet_info", "created_at", {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    });

    // add updated_at
    await queryInterface.addColumn("calculet_info", "updated_at", {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
      allowNull: false,
    });

    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1;", {
      type: Sequelize.QueryTypes.RAW,
    });
  },

  async down(queryInterface, Sequelize) {
    // to avoid constraint, set foreign key not use -> change column -> set foreign key use again
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0;", {
      type: Sequelize.QueryTypes.RAW,
    });
    await queryInterface.changeColumn("calculet_info", "id", {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    // to avoid default value, first delete default value -> rename -> add default value
    await queryInterface.changeColumn("calculet_info", "created_at", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    });
    await queryInterface.renameColumn(
      "calculet_info",
      "created_at",
      "birthday"
    );
    await queryInterface.changeColumn("calculet_info", "birthday", {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    });

    await queryInterface.removeColumn("calculet_info", "updated_at");

    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1;", {
      type: Sequelize.QueryTypes.RAW,
    });
  },
};
