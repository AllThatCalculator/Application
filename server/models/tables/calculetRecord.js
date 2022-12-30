module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "calculetRecord",
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
      input: {
        type: DataTypes.STRING(2184),
        allowNull: true,
      },
      output: {
        type: DataTypes.STRING(2184),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "calculet_record",
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
