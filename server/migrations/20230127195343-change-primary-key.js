"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // ignore foreign key to prevent confilct
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0;", {
      type: Sequelize.QueryTypes.RAW,
    });
    await queryInterface.renameColumn("category_sub", "id", "sub_id");
    await queryInterface.sequelize.query(
      "ALTER TABLE category_sub DROP PRIMARY KEY, ADD PRIMARY KEY (`main_id`, `sub_id`)"
    );

    await queryInterface.addColumn("calculet_record", "id", {
      type: Sequelize.UUID,
      defaultValue: Sequelize.Sequelize.fn("uuid"),
      allowNull: false,
      primaryKey: true,
    });

    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1;", {
      type: Sequelize.QueryTypes.RAW,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
