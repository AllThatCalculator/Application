const SequelizeAuto = require("sequelize-auto");

const auto = new SequelizeAuto(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: "mysql",
    directory: "./models/",
    caseModel: "c",
    caseFile: "c",
    caseProp: "c",
  }
);
auto.run((err) => {
  if (err) throw err;
});
