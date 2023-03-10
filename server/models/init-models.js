const DataTypes = require("sequelize").DataTypes;
const _calculetCount = require("./tables/calculetCount");
const _calculetInfo = require("./tables/calculetInfo");
const _calculetInfoTemp = require("./tables/calculetInfoTemp");
const _calculetRecord = require("./tables/calculetRecord");
const _calculetStatistics = require("./tables/calculetStatistics");
const _calculetUpdateLog = require("./tables/calculetUpdateLog");
const _categoryMain = require("./tables/categoryMain");
const _categorySub = require("./tables/categorySub");
const _category = require("./tables/category");
const _userCalculetBookmark = require("./tables/userCalculetBookmark");
const _userCalculetLike = require("./tables/userCalculetLike");
const _userInfo = require("./tables/userInfo");

function initModels(sequelize) {
  const calculetCount = _calculetCount(sequelize, DataTypes);
  const calculetInfo = _calculetInfo(sequelize, DataTypes);
  const calculetInfoTemp = _calculetInfoTemp(sequelize, DataTypes);
  const calculetRecord = _calculetRecord(sequelize, DataTypes);
  const calculetStatistics = _calculetStatistics(sequelize, DataTypes);
  const calculetUpdateLog = _calculetUpdateLog(sequelize, DataTypes);
  const categoryMain = _categoryMain(sequelize, DataTypes);
  const categorySub = _categorySub(sequelize, DataTypes);
  const category = _category(sequelize, DataTypes);
  const userCalculetBookmark = _userCalculetBookmark(sequelize, DataTypes);
  const userCalculetLike = _userCalculetLike(sequelize, DataTypes);
  const userInfo = _userInfo(sequelize, DataTypes);

  // calculetInfo(N) - caculetRecord - userInfo(M)
  calculetInfo.belongsToMany(userInfo, {
    as: "user_id_user_infos",
    through: calculetRecord,
    foreignKey: "calculet_id",
    otherKey: "user_id",
  });
  userInfo.belongsToMany(calculetInfo, {
    as: "calculet_id_calculet_infos",
    through: calculetRecord,
    foreignKey: "user_id",
    otherKey: "calculet_id",
  });

  // calculetInfo(N) - userCalculetBookmark - userInfo(M)
  calculetInfo.belongsToMany(userInfo, {
    as: "user_id_user_info_user_calculet_bookmarks",
    through: userCalculetBookmark,
    foreignKey: "calculet_id",
    otherKey: "user_id",
  });
  userInfo.belongsToMany(calculetInfo, {
    as: "calculet_id_calculet_info_user_calculet_bookmarks",
    through: userCalculetBookmark,
    foreignKey: "user_id",
    otherKey: "calculet_id",
  });

  // calculetInfo(N) - userCaculetLike - userInfo(M)
  calculetInfo.belongsToMany(userInfo, {
    as: "user_id_user_info_user_calculet_likes",
    through: userCalculetLike,
    foreignKey: "calculet_id",
    otherKey: "user_id",
  });
  userInfo.belongsToMany(calculetInfo, {
    as: "calculet_id_calculet_info_user_calculet_likes",
    through: userCalculetLike,
    foreignKey: "user_id",
    otherKey: "calculet_id",
  });

  // calculetInfo(1) - calculetCount(1)
  calculetCount.belongsTo(calculetInfo, {
    as: "calculet",
    foreignKey: "calculet_id",
  });
  calculetInfo.hasOne(calculetCount, {
    as: "calculet_count",
    foreignKey: "calculet_id",
  });

  // calculetInfo(1) - calculetRecord(N)
  calculetRecord.belongsTo(calculetInfo, {
    as: "calculet",
    foreignKey: "calculet_id",
  });
  calculetInfo.hasMany(calculetRecord, {
    as: "calculet_records",
    foreignKey: "calculet_id",
  });

  // calculetInfo(1) - calculetStatistics(1)
  calculetStatistics.belongsTo(calculetInfo, {
    as: "calculet",
    foreignKey: "calculet_id",
  });
  calculetInfo.hasOne(calculetStatistics, {
    as: "calculet_statistic",
    foreignKey: "calculet_id",
  });

  // calculetInfo(1) - calculetUpdateLog(N)
  calculetUpdateLog.belongsTo(calculetInfo, {
    as: "calculet",
    foreignKey: "calculet_id",
  });
  calculetInfo.hasMany(calculetUpdateLog, {
    as: "calculet_update_logs",
    foreignKey: "calculet_id",
  });

  // calculetInfo(1) - userCalculetBookmark(N)
  userCalculetBookmark.belongsTo(calculetInfo, {
    as: "calculet",
    foreignKey: "calculet_id",
  });
  calculetInfo.hasMany(userCalculetBookmark, {
    as: "user_calculet_bookmarks",
    foreignKey: "calculet_id",
  });

  // calculetInfo(1) - userCalculetLike(N)
  userCalculetLike.belongsTo(calculetInfo, {
    as: "calculet",
    foreignKey: "calculet_id",
  });
  calculetInfo.hasMany(userCalculetLike, {
    as: "user_calculet_likes",
    foreignKey: "calculet_id",
  });

  // categoryMain(N) - category - categorySub(M)
  categoryMain.belongsToMany(categorySub, {
    as: "sub_id_category_subs",
    through: category,
    foreignKey: "main_id",
    otherKey: "sub_id",
  });
  categorySub.belongsToMany(categoryMain, {
    as: "main_id_category_mains",
    through: category,
    foreignKey: "sub_id",
    otherKey: "main_id",
  });

  // categoryMain(1) - category(N)
  category.belongsTo(categoryMain, { as: "main", foreignKey: "main_id" });
  categoryMain.hasMany(category, {
    as: "category_mains",
    foreignKey: "main_id",
  });

  // categorySub(1) - category(N)
  category.belongsTo(categorySub, { as: "sub", foreignKey: "sub_id" });
  categorySub.hasMany(category, {
    as: "category_subs",
    foreignKey: "sub_id",
  });

  // category(1) - calculetInfo(N)
  calculetInfo.belongsTo(category, {
    as: "category",
    foreignKey: "category_id",
  });
  category.hasMany(calculetInfo, {
    as: "calculet_infos",
    foreignKey: "category_id",
  });

  // category(1) - calculetInfoTemp(N)
  calculetInfoTemp.belongsTo(category, {
    as: "category",
    foreignKey: "category_id",
  });
  category.hasMany(calculetInfoTemp, {
    as: "calculet_info_temps",
    foreignKey: "category_id",
  });

  // userInfo(1) - calculetInfo(N)
  calculetInfo.belongsTo(userInfo, {
    as: "contributor",
    foreignKey: "contributor_id",
  });
  userInfo.hasMany(calculetInfo, {
    as: "calculet_infos",
    foreignKey: "contributor_id",
  });

  // userInfo(1) - calculetInfoTemp(N)
  calculetInfoTemp.belongsTo(userInfo, {
    as: "contributor",
    foreignKey: "contributor_id",
  });
  userInfo.hasMany(calculetInfoTemp, {
    as: "calculet_info_temps",
    foreignKey: "contributor_id",
  });

  // userInfo(1) - calculetRecord(N)
  calculetRecord.belongsTo(userInfo, { as: "user", foreignKey: "user_id" });
  userInfo.hasMany(calculetRecord, {
    as: "calculet_records",
    foreignKey: "user_id",
  });

  // userInfo(1) - userCalculetBookmark(N)
  userCalculetBookmark.belongsTo(userInfo, {
    as: "user",
    foreignKey: "user_id",
  });
  userInfo.hasMany(userCalculetBookmark, {
    as: "user_calculet_bookmarks",
    foreignKey: "user_id",
  });

  // userInfo(1) - userCalculetLike(N)
  userCalculetLike.belongsTo(userInfo, { as: "user", foreignKey: "user_id" });
  userInfo.hasMany(userCalculetLike, {
    as: "user_calculet_likes",
    foreignKey: "user_id",
  });

  return {
    calculetCount,
    calculetInfo,
    calculetInfoTemp,
    calculetRecord,
    calculetStatistics,
    calculetUpdateLog,
    category,
    categoryMain,
    categorySub,
    userCalculetBookmark,
    userCalculetLike,
    userInfo,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
