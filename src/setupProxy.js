// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // 우리가 '/api'라고 요청을 보내면
    createProxyMiddleware({
      target: "https://smart.incheon.go.kr", // 인천시 서버로 바꿔서 보낸다
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // 보낼 때는 '/api' 글자를 지우고 보낸다
      },
    })
  );
};
