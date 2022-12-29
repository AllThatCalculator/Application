const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "calculetStatistics",
    {
      calculet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "calculet_info",
          key: "id",
        },
      },
      like_cnt: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      bookmark_cnt: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      report_cnt: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "calculet_statistics",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "calculet_id" }],
        },
      ],
    }
  );
};
