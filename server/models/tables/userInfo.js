module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "userInfo",
    {
      id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      email: {
        type: DataTypes.STRING(254),
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      profile_img: {
        type: DataTypes.CHAR(36),
        allowNull: true,
      },
      bio: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      sex: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      job: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "user_info",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
