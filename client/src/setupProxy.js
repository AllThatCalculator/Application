const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api", "/file", "/static-files"],
    createProxyMiddleware({
      target: "https://www.allthatcalculator.net", // development server
      changeOrigin: true,
    })
  );
};
