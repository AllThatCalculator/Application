"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // to avoid constraint, set foreign key not use -> change column -> set foreign key use again
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0;", {
      type: Sequelize.QueryTypes.RAW,
    });

    // change foreign key first in calculet_info & calculet_info_temp
    await queryInterface.changeColumn("calculet_info", "contributor_id", {
      type: Sequelize.UUID,
      allowNull: false,
    });
    await queryInterface.changeColumn("calculet_info_temp", "contributor_id", {
      type: Sequelize.UUID,
      allowNull: false,
    });

    // change user info id
    await queryInterface.changeColumn("user_info", "id", {
      type: Sequelize.UUID,
      allowNull: false,
    });

    await queryInterface.addColumn("user_info", "created_at", {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    });

    await queryInterface.addColumn("user_info", "updated_at", {
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

    // change foreign key first in calculet_info & calculet_info_temp
    await queryInterface.changeColumn("calculet_info", "contributor_id", {
      type: Sequelize.STRING(254),
      allowNull: false,
    });
    await queryInterface.changeColumn("calculet_info_temp", "contributor_id", {
      type: Sequelize.STRING(254),
      allowNull: false,
    });

    await queryInterface.changeColumn("user_info", "id", {
      type: Sequelize.STRING(254),
      allowNull: false,
    });

    await queryInterface.removeColumn("user_info", "created_at");
    await queryInterface.removeColumn("user_info", "updated_at");

    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1;", {
      type: Sequelize.QueryTypes.RAW,
    });
  },
};
