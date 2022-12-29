var DataTypes = require("sequelize").DataTypes;
var _calculetCount = require("./calculetCount");
var _calculetInfo = require("./calculetInfo");
var _calculetInfoTemp = require("./calculetInfoTemp");
var _calculetStatistics = require("./calculetStatistics");
var _calculetUpdateLog = require("./calculetUpdateLog");
var _categoryMain = require("./categoryMain");
var _categorySub = require("./categorySub");
var _userCalculet = require("./userCalculet");
var _userInfo = require("./userInfo");

function initModels(sequelize) {
  var calculetCount = _calculetCount(sequelize, DataTypes);
  var calculetInfo = _calculetInfo(sequelize, DataTypes);
  var calculetInfoTemp = _calculetInfoTemp(sequelize, DataTypes);
  var calculetStatistics = _calculetStatistics(sequelize, DataTypes);
  var calculetUpdateLog = _calculetUpdateLog(sequelize, DataTypes);
  var categoryMain = _categoryMain(sequelize, DataTypes);
  var categorySub = _categorySub(sequelize, DataTypes);
  var userCalculet = _userCalculet(sequelize, DataTypes);
  var userInfo = _userInfo(sequelize, DataTypes);

  calculetInfo.belongsToMany(userInfo, {
    as: "user_id_user_infos",
    through: userCalculet,
    foreignKey: "calculet_id",
    otherKey: "user_id",
  });
  userInfo.belongsToMany(calculetInfo, {
    as: "calculet_id_calculet_infos",
    through: userCalculet,
    foreignKey: "user_id",
    otherKey: "calculet_id",
  });
  calculetCount.belongsTo(calculetInfo, {
    as: "calculet",
    foreignKey: "calculet_id",
  });
  calculetInfo.hasOne(calculetCount, {
    as: "calculet_count",
    foreignKey: "calculet_id",
  });
  calculetStatistics.belongsTo(calculetInfo, {
    as: "calculet",
    foreignKey: "calculet_id",
  });
  calculetInfo.hasOne(calculetStatistics, {
    as: "calculet_statistic",
    foreignKey: "calculet_id",
  });
  calculetUpdateLog.belongsTo(calculetInfo, {
    as: "calculet",
    foreignKey: "calculet_id",
  });
  calculetInfo.hasMany(calculetUpdateLog, {
    as: "calculet_update_logs",
    foreignKey: "calculet_id",
  });
  userCalculet.belongsTo(calculetInfo, {
    as: "calculet",
    foreignKey: "calculet_id",
  });
  calculetInfo.hasMany(userCalculet, {
    as: "user_calculets",
    foreignKey: "calculet_id",
  });
  calculetInfo.belongsTo(categoryMain, {
    as: "category_main",
    foreignKey: "category_main_id",
  });
  categoryMain.hasMany(calculetInfo, {
    as: "calculet_infos",
    foreignKey: "category_main_id",
  });
  calculetInfoTemp.belongsTo(categoryMain, {
    as: "category_main",
    foreignKey: "category_main_id",
  });
  categoryMain.hasMany(calculetInfoTemp, {
    as: "calculet_info_temps",
    foreignKey: "category_main_id",
  });
  categorySub.belongsTo(categoryMain, { as: "main", foreignKey: "main_id" });
  categoryMain.hasMany(categorySub, {
    as: "category_subs",
    foreignKey: "main_id",
  });
  calculetInfo.belongsTo(categorySub, {
    as: "category_sub",
    foreignKey: "category_sub_id",
  });
  categorySub.hasMany(calculetInfo, {
    as: "calculet_infos",
    foreignKey: "category_sub_id",
  });
  calculetInfoTemp.belongsTo(categorySub, {
    as: "category_sub",
    foreignKey: "category_sub_id",
  });
  categorySub.hasMany(calculetInfoTemp, {
    as: "calculet_info_temps",
    foreignKey: "category_sub_id",
  });
  calculetInfo.belongsTo(userInfo, {
    as: "contributor",
    foreignKey: "contributor_id",
  });
  userInfo.hasMany(calculetInfo, {
    as: "calculet_infos",
    foreignKey: "contributor_id",
  });
  calculetInfoTemp.belongsTo(userInfo, {
    as: "contributor",
    foreignKey: "contributor_id",
  });
  userInfo.hasMany(calculetInfoTemp, {
    as: "calculet_info_temps",
    foreignKey: "contributor_id",
  });
  userCalculet.belongsTo(userInfo, { as: "user", foreignKey: "user_id" });
  userInfo.hasMany(userCalculet, {
    as: "user_calculets",
    foreignKey: "user_id",
  });

  return {
    calculetCount,
    calculetInfo,
    calculetInfoTemp,
    calculetStatistics,
    calculetUpdateLog,
    categoryMain,
    categorySub,
    userCalculet,
    userInfo,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
