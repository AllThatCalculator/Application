const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api", "/file"],
    createProxyMiddleware({
      target: "http://www.allthatcalculator.net", // development server
      changeOrigin: true,
    })
  );
};
