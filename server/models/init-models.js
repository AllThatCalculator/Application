var DataTypes = require("sequelize").DataTypes;
var _admin = require("./tables/admin");
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
  var admin = _admin(sequelize, DataTypes);
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

  calculetInfo.belongsToMany(userInfo, {
    as: "userIdUserInfos",
    through: userCalculetBookmark,
    foreignKey: "calculetId",
    otherKey: "userId",
  });
  calculetInfo.belongsToMany(userInfo, {
    as: "userIdUserInfoUserCalculetLikes",
    through: userCalculetLike,
    foreignKey: "calculetId",
    otherKey: "userId",
  });
  categoryMain.belongsToMany(categorySub, {
    as: "subIdCategorySubs",
    through: category,
    foreignKey: "mainId",
    otherKey: "subId",
  });
  categorySub.belongsToMany(categoryMain, {
    as: "mainIdCategoryMains",
    through: category,
    foreignKey: "subId",
    otherKey: "mainId",
  });
  userInfo.belongsToMany(calculetInfo, {
    as: "calculetIdCalculetInfos",
    through: userCalculetBookmark,
    foreignKey: "userId",
    otherKey: "calculetId",
  });
  userInfo.belongsToMany(calculetInfo, {
    as: "calculetIdCalculetInfoUserCalculetLikes",
    through: userCalculetLike,
    foreignKey: "userId",
    otherKey: "calculetId",
  });
  calculetRecord.belongsTo(calculetInfo, {
    as: "calculet",
    foreignKey: "calculetId",
  });
  calculetInfo.hasMany(calculetRecord, {
    as: "calculetRecords",
    foreignKey: "calculetId",
  });
  calculetUpdateLog.belongsTo(calculetInfo, {
    as: "calculet",
    foreignKey: "calculetId",
  });
  calculetInfo.hasMany(calculetUpdateLog, {
    as: "calculetUpdateLogs",
    foreignKey: "calculetId",
  });
  userCalculetBookmark.belongsTo(calculetInfo, {
    as: "calculet",
    foreignKey: "calculetId",
  });
  calculetInfo.hasMany(userCalculetBookmark, {
    as: "userCalculetBookmarks",
    foreignKey: "calculetId",
  });
  userCalculetLike.belongsTo(calculetInfo, {
    as: "calculet",
    foreignKey: "calculetId",
  });
  calculetInfo.hasMany(userCalculetLike, {
    as: "userCalculetLikes",
    foreignKey: "calculetId",
  });
  calculetInfo.belongsTo(category, {
    as: "categoryMain",
    foreignKey: "categoryMainId",
  });
  category.hasMany(calculetInfo, {
    as: "calculetInfos",
    foreignKey: "categoryMainId",
  });
  calculetInfo.belongsTo(category, {
    as: "categorySub",
    foreignKey: "categorySubId",
  });
  category.hasMany(calculetInfo, {
    as: "categorySubCalculetInfos",
    foreignKey: "categorySubId",
  });
  calculetInfoTemp.belongsTo(category, {
    as: "categoryMain",
    foreignKey: "categoryMainId",
  });
  category.hasMany(calculetInfoTemp, {
    as: "calculetInfoTemps",
    foreignKey: "categoryMainId",
  });
  calculetInfoTemp.belongsTo(category, {
    as: "categorySub",
    foreignKey: "categorySubId",
  });
  category.hasMany(calculetInfoTemp, {
    as: "categorySubCalculetInfoTemps",
    foreignKey: "categorySubId",
  });
  category.belongsTo(categoryMain, { as: "main", foreignKey: "mainId" });
  categoryMain.hasMany(category, { as: "categories", foreignKey: "mainId" });
  category.belongsTo(categorySub, { as: "sub", foreignKey: "subId" });
  categorySub.hasMany(category, { as: "categories", foreignKey: "subId" });
  admin.belongsTo(userInfo, { as: "idUserInfo", foreignKey: "id" });
  userInfo.hasOne(admin, { as: "admin", foreignKey: "id" });
  admin.belongsTo(userInfo, { as: "emailUserInfo", foreignKey: "email" });
  userInfo.hasMany(admin, { as: "emailAdmins", foreignKey: "email" });
  calculetInfo.belongsTo(userInfo, {
    as: "contributor",
    foreignKey: "contributorId",
  });
  userInfo.hasMany(calculetInfo, {
    as: "calculetInfos",
    foreignKey: "contributorId",
  });
  calculetInfoTemp.belongsTo(userInfo, {
    as: "contributor",
    foreignKey: "contributorId",
  });
  userInfo.hasMany(calculetInfoTemp, {
    as: "calculetInfoTemps",
    foreignKey: "contributorId",
  });
  calculetRecord.belongsTo(userInfo, { as: "user", foreignKey: "userId" });
  userInfo.hasMany(calculetRecord, {
    as: "calculetRecords",
    foreignKey: "userId",
  });
  userCalculetBookmark.belongsTo(userInfo, {
    as: "user",
    foreignKey: "userId",
  });
  userInfo.hasMany(userCalculetBookmark, {
    as: "userCalculetBookmarks",
    foreignKey: "userId",
  });
  userCalculetLike.belongsTo(userInfo, { as: "user", foreignKey: "userId" });
  userInfo.hasMany(userCalculetLike, {
    as: "userCalculetLikes",
    foreignKey: "userId",
  });

  return {
    admin,
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
