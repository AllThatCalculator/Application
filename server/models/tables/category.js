module.exports = function (sequelize, DataTypes) {
  return sequelize.define('category', {
    mainId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'category_main',
        key: 'id'
      },
      field: "main_id"
    },
    subId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'category_sub',
        key: 'id'
      },
      field: "sub_id"
    }
  }, {
    sequelize,
    tableName: 'category',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "main_id" },
          { name: "sub_id" },
        ]
      },
      {
        name: "category_ibfk_2_idx",
        using: "BTREE",
        fields: [
          { name: "sub_id" },
        ]
      },
    ]
  });
};
