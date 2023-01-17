"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("calculet_record", "created_at", {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },
};
