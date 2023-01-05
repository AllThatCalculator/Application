const express = require("express");
const calculets = require("./routes/calculets");
const users = require("./routes/users");
// const record = require("./routes/record");
const { swaggerUi, specs } = require("./swagger");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const { sequelize } = require("./models");

const app = express();

require("dotenv").config();
const port = process.env.EXPRESS_PORT;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("sequelize 연결 성공");
  })
  .catch((err) => {
    console.error(`sequelize 연결 실패 - ${err}`);
  });

/**
 * 쿠키 파싱
 */
app.use(cookieParser());

/**
 * body에 싸서 온 데이터에 접근하기 위해 필요한 부분
 */
app.use(express.urlencoded({ limit: "1mb", extended: true }));
app.use(express.json({ limit: "1mb" }));

/**
 * API 문서 path 등록하기
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * 계산기 관리 API
 */
app.use("/calculets", calculets);

/**
 * 로그인 관리 API
 */
app.use("/users", users);

/**
 * 계산 이력 관리 API
 */
// app.use("/record", record);

/**
 * 서버 시작
 */
app.listen(port, () => {
  console.log(`listening ${port}`);
});
