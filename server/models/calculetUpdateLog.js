const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('calculetUpdateLog', {
    update_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      primaryKey: true
    },
    message: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    calculet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'calculet_info',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'calculet_update_log',
    timestamps: true,
    freezeTableName: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "calculet_id" },
          { name: "update_date" },
        ]
      },
    ]
  });
};
