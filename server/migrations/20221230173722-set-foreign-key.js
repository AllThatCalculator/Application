"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // user_calculet_like table
    await queryInterface.changeColumn("user_calculet_like", "calculet_id", {
      type: Sequelize.UUID,
      references: {
        model: "calculet_info",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.changeColumn("user_calculet_like", "user_id", {
      type: Sequelize.UUID,
      references: {
        model: "user_info",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    // user_calculet_bookmark table
    await queryInterface.changeColumn("user_calculet_bookmark", "calculet_id", {
      type: Sequelize.UUID,
      references: {
        model: "calculet_info",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.changeColumn("user_calculet_bookmark", "user_id", {
      type: Sequelize.UUID,
      references: {
        model: "user_info",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    // calculet_record table
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

  async down(queryInterface, Sequelize) {
    // user_calculet_like table
    await queryInterface.changeColumn("user_calculet_like", "calculet_id", {
      type: Sequelize.UUID,
    });
    await queryInterface.changeColumn("user_calculet_like", "user_id", {
      type: Sequelize.UUID,
    });

    // user_calculet_bookmark table
    await queryInterface.changeColumn("user_calculet_bookmark", "calculet_id", {
      type: Sequelize.UUID,
    });
    await queryInterface.changeColumn("user_calculet_bookmark", "user_id", {
      type: Sequelize.UUID,
    });

    // calculet_record table
    await queryInterface.changeColumn("calculet_record", "calculet_id", {
      type: Sequelize.UUID,
    });
    await queryInterface.changeColumn("calculet_record", "user_id", {
      type: Sequelize.UUID,
    });
  },
};
