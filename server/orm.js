require("dotenv").config();
const env = process.env;

const SequelizeAuto = require("sequelize-auto");

const auto = new SequelizeAuto(
  env.MYSQL_DATABASE,
  env.MYSQL_USER,
  env.MYSQL_PASSWORD,
  {
    host: env.MYSQL_HOST,
    port: env.MYSQL_PORT,
    dialect: "mysql",
    caseModel: "c",
    caseFile: "c",
  }
);
auto.run((err) => {
  if (err) throw err;
});
