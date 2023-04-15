module.exports = function (sequelize, DataTypes) {
  return sequelize.define('calculetInfo', {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    srcCode: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "src_code"
    },
    manual: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    categoryMainId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'main_id'
      },
      field: "category_main_id"
    },
    categorySubId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'sub_id'
      },
      field: "category_sub_id"
    },
    contributorId: {
      type: DataTypes.STRING(36),
      allowNull: true,
      references: {
        model: 'user_info',
        key: 'id'
      },
      field: "contributor_id"
    },
    blocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    viewCnt: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      field: "view_cnt"
    },
    calculationCnt: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      field: "calculation_cnt"
    },
    userCnt: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      field: "user_cnt"
    },
    likeCnt: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      field: "like_cnt"
    },
    bookmarkCnt: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      field: "bookmark_cnt"
    },
    reportCnt: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
      field: "report_cnt"
    },
    statistics: {
      type: DataTypes.VIRTUAL,
      get() {
        return {
          bookmark: this.bookmarkCnt,
          like: this.likeCnt,
          report: this.reportCnt,
          view: this.viewCnt,
          user: this.userCnt,
          calculation: this.calculationCnt,
        };
      }
    }
  }, {
    sequelize,
    tableName: "calculet_info",
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
        name: "calculet_info_ibfk_1_idx",
        using: "BTREE",
        fields: [
          { name: "contributor_id" },
        ]
      },
      {
        name: "calculet_info_ibfk_2_idx",
        using: "BTREE",
        fields: [
          { name: "category_main_id" },
          { name: "category_sub_id" },
        ]
      },
      {
        name: "title_FULLTEXT",
        type: "FULLTEXT",
        fields: [
          { name: "title" },
        ]
      },
      {
        name: "desc_FULLTEXT",
        type: "FULLTEXT",
        fields: [
          { name: "description" },
          { name: "manual" },
        ]
      },
      {
        name: "title_desc_FULLTEXT",
        type: "FULLTEXT",
        fields: [
          { name: "title" },
          { name: "description" },
          { name: "manual" },
        ]
      },
    ]
  });
};
