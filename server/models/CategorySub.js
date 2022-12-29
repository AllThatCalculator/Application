const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "categorySub",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      sub: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      main_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "category_main",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "category_sub",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "main_id",
          using: "BTREE",
          fields: [{ name: "main_id" }],
        },
      ],
    }
  );
};
