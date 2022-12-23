const initModels = require("./init-models");
const { Sequelize } = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
// 모델과 테이블간의 관계가 맺어짐
db.models = initModels(sequelize);

module.exports = db;
