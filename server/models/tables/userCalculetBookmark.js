module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "userCalculetBookmark",
    {
      calculet_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
        references: {
          model: "calculet_info",
          key: "id",
        },
      },
      user_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
        references: {
          model: "user_info",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "user_calculet_bookmark",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "calculet_id" }, { name: "user_id" }],
        },
        {
          name: "user_id",
          using: "BTREE",
          fields: [{ name: "user_id" }],
        },
      ],
    }
  );
};
