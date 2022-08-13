const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://backend:5000",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // URL ^/api -> 공백 변경
      },
    })
  );
  app.use(
    "/file",
    createProxyMiddleware({
      target: "http://nginx:80",
      changeOrigin: true,
    })
  );
};
