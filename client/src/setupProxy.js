const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api", "/file"],
    createProxyMiddleware({
      target: "https://www.allthatcalculator.net", // development server
      changeOrigin: true,
    })
  );
};
