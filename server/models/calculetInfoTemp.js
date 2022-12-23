const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('calculetInfoTemp', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    src_code: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    manual: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    category_main_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'category_main',
        key: 'id'
      }
    },
    category_sub_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'category_sub',
        key: 'id'
      }
    },
    contributor_id: {
      type: DataTypes.STRING(254),
      allowNull: false,
      references: {
        model: 'user_info',
        key: 'id'
      }
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    updated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'calculet_info_temp',
    timestamps: true,
    freezeTableName: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "contributor_id",
        using: "BTREE",
        fields: [
          { name: "contributor_id" },
        ]
      },
      {
        name: "category_main_id",
        using: "BTREE",
        fields: [
          { name: "category_main_id" },
        ]
      },
      {
        name: "category_sub_id",
        using: "BTREE",
        fields: [
          { name: "category_sub_id" },
        ]
      },
    ]
  });
};
