const Sequelize = require("sequelize");

// 모델 클래스
const CalculetInfo = require("./CalculetInfo");
const CategoryMain = require("./CategoryMain");
const CategorySub = require("./CategorySub");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
  {
    define: {
      freezeTableName: true,
      timestamps: true,
    },
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// // 모델 클래스 넣기
// db.CalculetInfo = CalculetInfo;
// db.CategoryMain = CategoryMain;
// db.CategorySub = CategorySub;

// // 모델과 테이블 연결
// CalculetInfo.init(sequelize);
// CategoryMain.init(sequelize);
// CategorySub.init(sequelize);

// CategoryMain.associate(db);
// CategorySub.associate(db);

module.exports = db;
