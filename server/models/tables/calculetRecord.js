const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "calculetRecord",
    {
      id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.Sequelize.fn("uuid"),
      },
      calculetId: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        references: {
          model: "calculet_info",
          key: "id",
        },
        field: "calculet_id",
      },
      userId: {
        type: DataTypes.STRING(36),
        allowNull: false,
        references: {
          model: "user_info",
          key: "id",
        },
        field: "user_id",
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
      hasTrigger: true,
      timestamps: true,
      updatedAt: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "id_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "calculet_record_ibfk_1_idx",
          using: "BTREE",
          fields: [{ name: "calculet_id" }],
        },
        {
          name: "calculet_record_ibfk_2_idx",
          using: "BTREE",
          fields: [{ name: "user_id" }],
        },
      ],
    }
  );
};
