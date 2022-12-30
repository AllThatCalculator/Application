"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // drop user_calculet table
    await queryInterface.dropTable("user_calculet");

    // add user_calculet_like table
    await queryInterface.createTable("user_calculet_like", {
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
    });

    // add user_calculet_bookmark table
    await queryInterface.createTable("user_calculet_bookmark", {
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.createTable("user_calculet", {
      liked: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      bookmarked: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      calculet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "calculet_info",
          key: "id",
        },
      },
      user_id: {
        type: DataTypes.STRING(254),
        allowNull: false,
        primaryKey: true,
        references: {
          model: "user_info",
          key: "id",
        },
      },
    });

    await queryInterface.dropTable("user_calculet_like");
    await queryInterface.dropTable("user_calculet_bookmark");
  },
};
