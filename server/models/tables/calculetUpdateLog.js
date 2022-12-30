module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "calculetUpdateLog",
    {
      message: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      calculet_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
        references: {
          model: "calculet_info",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "calculet_update_log",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "calculet_id" }, { name: "created_at" }],
        },
      ],
    }
  );
};
