module.exports = function (sequelize, DataTypes) {
  return sequelize.define('userCalculetBookmark', {
    calculetId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'calculet_info',
        key: 'id'
      },
      field: "calculet_id"
    },
    userId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user_info',
        key: 'id'
      },
      field: "user_id"
    }
  }, {
    sequelize,
    tableName: 'user_calculet_bookmark',
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
        name: "user_calculet_like_ibfk_2_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
