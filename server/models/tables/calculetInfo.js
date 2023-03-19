const { bufferToString } = require("../../utils/bufferConverter");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "calculetInfo",
    {
      id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      src_code: {
        type: DataTypes.BLOB,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue('src_code');
          return rawValue ? bufferToString(rawValue) : null;
        }
      },
      manual: {
        type: DataTypes.BLOB,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue('manual');
          return rawValue ? bufferToString(rawValue) : null;
        }
      },
      description: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "category",
          key: "id",
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
      blocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "calculet_info",
      hasTrigger: true,
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
          name: "category_id",
          using: "BTREE",
          fields: [{ name: "category_id" }],
        },
      ],
    }
  );
};
