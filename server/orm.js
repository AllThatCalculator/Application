const SequelizeAuto = require("sequelize-auto");

const auto = new SequelizeAuto(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: "mysql",
    directory: "./models2/",
    caseModel: "c",
    caseFile: "c",
  }
);
auto.run((err) => {
  if (err) throw err;
});
