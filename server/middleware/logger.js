const { timestamp } = require("../utils/timestamp");

exports.logger = (req, res, next) => {
  const log = `${timestamp()} [${req.method}] ${req.url}`;
  console.log(log);
  next();
};
