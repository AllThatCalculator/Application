exports.logger = (req, res, next) => {
  const log = `${new Date().toLocaleString("en-US", {
    timeZone: "Asia/Seoul",
  })} [${req.method}] ${req.url}`;
  console.log(log);
  next();
};
