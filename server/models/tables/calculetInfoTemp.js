const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "calculetInfoTemp",
    {
      id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.Sequelize.fn("uuid"),
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      srcCode: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "src_code",
      },
      manual: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      categoryMainId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "category",
          key: "main_id",
        },
        field: "category_main_id",
      },
      categorySubId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "category",
          key: "sub_id",
        },
        field: "category_sub_id",
      },
      contributorId: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
          model: "user_info",
          key: "id",
        },
        field: "contributor_id",
      },
      registered: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      type: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      calculetId: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        unique: true,
        defaultValue: Sequelize.Sequelize.fn("uuid"),
      },
      blocked: {
        type: DataTypes.VIRTUAL,
        get() {
          return 2;
        },
      },
      viewCnt: {
        type: DataTypes.VIRTUAL,
        get() {
          return 0;
        },
      },
      likeCnt: {
        type: DataTypes.VIRTUAL,
        get() {
          return 0;
        },
      },
      bookmarkCnt: {
        type: DataTypes.VIRTUAL,
        get() {
          return 0;
        },
      },
    },
    {
      sequelize,
      tableName: "calculet_info_temp",
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
          name: "id_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "calculet_info_temp_ibfk_1_idx",
          using: "BTREE",
          fields: [{ name: "contributor_id" }],
        },
        {
          name: "calculet_info_temp_ibfk_2_idx",
          using: "BTREE",
          fields: [{ name: "category_main_id" }, { name: "category_sub_id" }],
        },
        {
          name: "calculet_id_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [{ name: "calculet_id" }],
        },
      ],
    }
  );
};
