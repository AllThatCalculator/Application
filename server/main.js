const express = require("express");
const app = express();
// apis
const calculets = require("./routes/calculets");
const users = require("./routes/users");
const records = require("./routes/records");
const test = require("./routes/test");

// 에러 처리
const { errorHandler } = require("./middleware/errorHandler");

require("dotenv").config();
const port = process.env.EXPRESS_PORT;

// 데이터베이스 연결
const { sequelize } = require("./models");
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("sequelize 연결 성공");
  })
  .catch((err) => {
    console.error(`sequelize 연결 실패 - ${err}`);
  });

// body에 싸서 온 데이터에 접근하기 위해 필요한 부분
app.use(express.urlencoded({ limit: "1mb", extended: true }));
app.use(express.json({ limit: "1mb" }));

// API 문서 path 등록하기
const { swaggerUi, specs } = require("./swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// 테스트용 API
app.use("/test", test);

// 계산기 관리 API
app.use("/calculets", calculets);

// 유저 관리 API
app.use("/users", users);

// 계산 이력 관리 API
app.use("/records", records);

// default error handler
app.use(errorHandler.default);

// 서버 시작
app.listen(port, () => {
  console.log(`listening ${port}`);
});
