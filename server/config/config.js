const development = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  dialect: "mysql",
  dialectOptions: {
    charset: "utf8mb4",
  },
  define: {
    underscored: true,
    underscoredAll: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  logging: false,
};

const production = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  dialect: "mysql",
  dialectOptions: {
    charset: "utf8mb4",
  },
  define: {
    underscored: true,
    underscoredAll: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  logging: false,
};

const test = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE_TEST,
  host: process.env.MYSQL_HOST,
  dialect: "mysql",
};

module.exports = { development, production, test };
