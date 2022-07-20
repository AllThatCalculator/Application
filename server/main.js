const express = require("express");
const calculets = require("./routes/calculets");

const app = express();

const port = 5000;

/**
 * 백엔드 서버 연결 확인용 요청
 */
app.get("/", (req, res) => {
  res.send("this is from backend server");
});

/**
 * 계산기 관리 API
 */
app.use("/calculets", calculets);

/**
 * 에러 처리 미들웨어 (임시)
 */
app.use((err, req, res, next) => {
  console.error(err);
  res.send("에러났습니다.");
});

/**
 * 서버 시작
 */
app.listen(port, () => {
  console.log(`listening ${port}`);
});
