const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "calculetInfoTemp",
    {
      id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        defaultValue: Sequelize.Sequelize.fn("uuid"),
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      src_code: {
        type: DataTypes.BLOB,
        allowNull: false,
      },
      manual: {
        type: DataTypes.BLOB,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      category_main_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "category_sub",
          key: "main_id",
        },
      },
      category_sub_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "category_sub",
          key: "sub_id",
        },
      },
      contributor_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        references: {
          model: "user_info",
          key: "id",
        },
      },
      registered: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "calculet_info_temp",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "contributor_id",
          using: "BTREE",
          fields: [{ name: "contributor_id" }],
        },
        {
          name: "category_main_id",
          using: "BTREE",
          fields: [{ name: "category_main_id" }],
        },
        {
          name: "category_sub_id",
          using: "BTREE",
          fields: [{ name: "category_sub_id" }],
        },
      ],
    }
  );
};
