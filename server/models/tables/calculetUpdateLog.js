const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('calculetUpdateLog', {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.Sequelize.fn("uuid")
    },
    message: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    calculetId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'calculet_info',
        key: 'id'
      },
      field: "calculet_id"
    }
  }, {
    sequelize,
    tableName: 'calculet_update_log',
    hasTrigger: true,
    timestamps: true,
    updatedAt: false,
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
        name: "id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "calculet_update_log_ibfk_1_idx",
        using: "BTREE",
        fields: [
          { name: "calculet_id" },
        ]
      },
    ]
  });
};
