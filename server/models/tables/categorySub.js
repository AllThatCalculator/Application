module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "categorySub",
    {
      sub_id: {
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
        primaryKey: true,
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
          fields: [{ name: "main_id" }, { name: "sub_id" }],
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
