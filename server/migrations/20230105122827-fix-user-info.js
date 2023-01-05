"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // change user profile to UUID (s3 bucket)
    await queryInterface.changeColumn("user_info", "profile_img", {
      type: Sequelize.UUID,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("user_info", "profile_img", {
      type: DataTypes.BLOB,
      allowNull: true,
    });
  },
};
