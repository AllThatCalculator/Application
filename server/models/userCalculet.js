const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userCalculet', {
    liked: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    bookmarked: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    calculet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'calculet_info',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.STRING(254),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user_info',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_calculet',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "calculet_id" },
          { name: "user_id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
