const { urlFormatter } = require("../../utils/urlFormatter");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('userInfo', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(254),
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: "user_name"
    },
    profileImgSrc: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      unique: true,
      field: "profile_img",
      get() {
        const rawValue = this.getDataValue("profileImgSrc");
        return rawValue ? urlFormatter("profileImg", rawValue) : null;
      }
    },
    bio: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    sex: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    job: {
      type: DataTypes.STRING(25),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user_info',
    timestamps: true,
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
        name: "profile_img_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "profile_img" },
        ]
      },
      {
        name: "id_email",
        using: "BTREE",
        fields: [
          { name: "id" },
          { name: "email" },
        ]
      },
    ]
  });
};
