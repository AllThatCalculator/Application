const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "calculetRecord",
    {
      id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.Sequelize.fn("uuid"),
      },
      calculet_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: false,
        references: {
          model: "calculet_info",
          key: "id",
        },
      },
      user_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: false,
        references: {
          model: "user_info",
          key: "id",
        },
      },
      input: {
        type: DataTypes.STRING(2184),
        allowNull: true,
      },
      output: {
        type: DataTypes.STRING(2184),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "calculet_record",
      timestamps: true,
      updatedAt: false,
      indexes: [
        {
          name: "user_id",
          using: "BTREE",
          fields: [{ name: "user_id" }],
        },
        {
          name: "calculet_id",
          using: "BTREE",
          fields: [{ name: "calculet_id" }],
        },
      ],
    }
  );
};
