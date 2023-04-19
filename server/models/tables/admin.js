module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "admin",
    {
      id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        primaryKey: true,
        references: {
          model: "user_info",
          key: "id",
        },
      },
      email: {
        type: DataTypes.STRING(254),
        allowNull: false,
        references: {
          model: "user_info",
          key: "email",
        },
      },
      accessLevel: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        field: "access_level",
      },
    },
    {
      sequelize,
      tableName: "admin",
      timestamps: false,
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
          name: "admin_ibfk_1_idx",
          using: "BTREE",
          fields: [{ name: "id" }, { name: "email" }],
        },
      ],
    }
  );
};
