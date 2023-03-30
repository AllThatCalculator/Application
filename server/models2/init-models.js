var DataTypes = require("sequelize").DataTypes;
var _calculetInfo = require("./tables/calculetInfo");
var _calculetInfoTemp = require("./tables/calculetInfoTemp");
var _calculetRecord = require("./tables/calculetRecord");
var _calculetUpdateLog = require("./tables/calculetUpdateLog");
var _category = require("./tables/category");
var _categoryMain = require("./tables/categoryMain");
var _categorySub = require("./tables/categorySub");
var _userCalculetBookmark = require("./tables/userCalculetBookmark");
var _userCalculetLike = require("./tables/userCalculetLike");
var _userInfo = require("./tables/userInfo");

function initModels(sequelize) {
  var calculetInfo = _calculetInfo(sequelize, DataTypes);
  var calculetInfoTemp = _calculetInfoTemp(sequelize, DataTypes);
  var calculetRecord = _calculetRecord(sequelize, DataTypes);
  var calculetUpdateLog = _calculetUpdateLog(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var categoryMain = _categoryMain(sequelize, DataTypes);
  var categorySub = _categorySub(sequelize, DataTypes);
  var userCalculetBookmark = _userCalculetBookmark(sequelize, DataTypes);
  var userCalculetLike = _userCalculetLike(sequelize, DataTypes);
  var userInfo = _userInfo(sequelize, DataTypes);

  calculetInfo.belongsToMany(userInfo, { as: 'user_id_user_infos', through: userCalculetBookmark, foreignKey: "calculet_id", otherKey: "user_id" });
  calculetInfo.belongsToMany(userInfo, { as: 'user_id_user_info_user_calculet_likes', through: userCalculetLike, foreignKey: "calculet_id", otherKey: "user_id" });
  categoryMain.belongsToMany(categorySub, { as: 'sub_id_category_subs', through: category, foreignKey: "main_id", otherKey: "sub_id" });
  categorySub.belongsToMany(categoryMain, { as: 'main_id_category_mains', through: category, foreignKey: "sub_id", otherKey: "main_id" });
  userInfo.belongsToMany(calculetInfo, { as: 'calculet_id_calculet_infos', through: userCalculetBookmark, foreignKey: "user_id", otherKey: "calculet_id" });
  userInfo.belongsToMany(calculetInfo, { as: 'calculet_id_calculet_info_user_calculet_likes', through: userCalculetLike, foreignKey: "user_id", otherKey: "calculet_id" });
  calculetRecord.belongsTo(calculetInfo, { as: "calculet", foreignKey: "calculet_id" });
  calculetInfo.hasMany(calculetRecord, { as: "calculet_records", foreignKey: "calculet_id" });
  calculetUpdateLog.belongsTo(calculetInfo, { as: "calculet", foreignKey: "calculet_id" });
  calculetInfo.hasMany(calculetUpdateLog, { as: "calculet_update_logs", foreignKey: "calculet_id" });
  userCalculetBookmark.belongsTo(calculetInfo, { as: "calculet", foreignKey: "calculet_id" });
  calculetInfo.hasMany(userCalculetBookmark, { as: "user_calculet_bookmarks", foreignKey: "calculet_id" });
  userCalculetLike.belongsTo(calculetInfo, { as: "calculet", foreignKey: "calculet_id" });
  calculetInfo.hasMany(userCalculetLike, { as: "user_calculet_likes", foreignKey: "calculet_id" });
  calculetInfo.belongsTo(category, { as: "category_main", foreignKey: "category_main_id" });
  category.hasMany(calculetInfo, { as: "calculet_infos", foreignKey: "category_main_id" });
  calculetInfo.belongsTo(category, { as: "category_sub", foreignKey: "category_sub_id" });
  category.hasMany(calculetInfo, { as: "category_sub_calculet_infos", foreignKey: "category_sub_id" });
  calculetInfoTemp.belongsTo(category, { as: "category_main", foreignKey: "category_main_id" });
  category.hasMany(calculetInfoTemp, { as: "calculet_info_temps", foreignKey: "category_main_id" });
  calculetInfoTemp.belongsTo(category, { as: "category_sub", foreignKey: "category_sub_id" });
  category.hasMany(calculetInfoTemp, { as: "category_sub_calculet_info_temps", foreignKey: "category_sub_id" });
  category.belongsTo(categoryMain, { as: "main", foreignKey: "main_id" });
  categoryMain.hasMany(category, { as: "categories", foreignKey: "main_id" });
  category.belongsTo(categorySub, { as: "sub", foreignKey: "sub_id" });
  categorySub.hasMany(category, { as: "categories", foreignKey: "sub_id" });
  calculetInfo.belongsTo(userInfo, { as: "contributor", foreignKey: "contributor_id" });
  userInfo.hasMany(calculetInfo, { as: "calculet_infos", foreignKey: "contributor_id" });
  calculetInfoTemp.belongsTo(userInfo, { as: "contributor", foreignKey: "contributor_id" });
  userInfo.hasMany(calculetInfoTemp, { as: "calculet_info_temps", foreignKey: "contributor_id" });
  calculetRecord.belongsTo(userInfo, { as: "user", foreignKey: "user_id" });
  userInfo.hasMany(calculetRecord, { as: "calculet_records", foreignKey: "user_id" });
  userCalculetBookmark.belongsTo(userInfo, { as: "user", foreignKey: "user_id" });
  userInfo.hasMany(userCalculetBookmark, { as: "user_calculet_bookmarks", foreignKey: "user_id" });
  userCalculetLike.belongsTo(userInfo, { as: "user", foreignKey: "user_id" });
  userInfo.hasMany(userCalculetLike, { as: "user_calculet_likes", foreignKey: "user_id" });

  return {
    calculetInfo,
    calculetInfoTemp,
    calculetRecord,
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
