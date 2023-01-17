"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.dropTable("calculet_record");
    await queryInterface.createTable("calculet_record", {
      calculet_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      input: {
        type: Sequelize.STRING(2184),
        allowNull: true,
      },
      output: {
        type: Sequelize.STRING(2184),
        allowNull: false,
      },
      created_at: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    });

    // set foriegn key
    await queryInterface.changeColumn("calculet_record", "calculet_id", {
      type: Sequelize.UUID,
      references: {
        model: "calculet_info",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.changeColumn("calculet_record", "user_id", {
      type: Sequelize.UUID,
      references: {
        model: "user_info",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
};
