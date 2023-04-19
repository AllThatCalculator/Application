const DataTypes = require("sequelize").DataTypes;
const _admin = require("./tables/admin");
const _calculetInfo = require("./tables/calculetInfo");
const _calculetInfoTemp = require("./tables/calculetInfoTemp");
const _calculetRecord = require("./tables/calculetRecord");
const _calculetUpdateLog = require("./tables/calculetUpdateLog");
const _category = require("./tables/category");
const _categoryMain = require("./tables/categoryMain");
const _categorySub = require("./tables/categorySub");
const _userCalculetBookmark = require("./tables/userCalculetBookmark");
const _userCalculetLike = require("./tables/userCalculetLike");
const _userInfo = require("./tables/userInfo");

function initModels(sequelize) {
  const admin = _admin(sequelize, DataTypes);
  const calculetInfo = _calculetInfo(sequelize, DataTypes);
  const calculetInfoTemp = _calculetInfoTemp(sequelize, DataTypes);
  const calculetRecord = _calculetRecord(sequelize, DataTypes);
  const calculetUpdateLog = _calculetUpdateLog(sequelize, DataTypes);
  const category = _category(sequelize, DataTypes);
  const categoryMain = _categoryMain(sequelize, DataTypes);
  const categorySub = _categorySub(sequelize, DataTypes);
  const userCalculetBookmark = _userCalculetBookmark(sequelize, DataTypes);
  const userCalculetLike = _userCalculetLike(sequelize, DataTypes);
  const userInfo = _userInfo(sequelize, DataTypes);

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
