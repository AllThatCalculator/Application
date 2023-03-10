const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "calculetUpdateLog",
    {
      id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.Sequelize.fn("uuid"),
      },
      message: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      calculet_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        references: {
          model: "calculet_info",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "calculet_update_log",
      timestamps: true,
      updatedAt: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "calculet_id" }, { name: "created_at" }],
        },
      ],
    }
  );
};
