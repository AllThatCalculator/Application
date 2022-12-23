const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('calculetCount', {
    calculet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'calculet_info',
        key: 'id'
      }
    },
    view_cnt: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    calculation_cnt: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    user_cnt: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'calculet_count',
    timestamps: true,
    freezeTableName: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "calculet_id" },
        ]
      },
    ]
  });
};
