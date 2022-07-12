var mariadb = require("mysql");
require("dotenv").config();

const connection = mariadb.createConnection({
  host: "mariadb",
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  charset: "utf8mb4",
});

module.exports = connection;
