const conf = require("../config/redis");
const redis = require("redis");
const redisClient = redis.createClient(
  `redis://${conf.user}:${conf.password}@${conf.host}:${conf.port}`
);
module.exports = redisClient;
