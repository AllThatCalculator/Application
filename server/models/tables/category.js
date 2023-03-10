module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "category",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      main_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "category_main",
          key: "id",
        },
      },
      sub_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "category_sub",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "category",
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
        {
          name: "sub_id",
          using: "BTREE",
          fields: [{ name: "sub_id" }],
        },
      ],
    }
  );
};
