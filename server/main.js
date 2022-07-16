const express = require("express");
const app = express();

const port = 5000;

const mariadb = require("./config/database");

app.get("/", (req, res) => {
  res.send("this is from backend server");
});

app.get("/calculets/:id", (req, res) => {
  // 계산기 정보 쿼리문
  const calculetQuery = `select id, title, src_code, manual, description, contributor_id from calculet_info where id=${req.params.id};`;

  // 계산기 통계 쿼리문
  const statisticsQuery = `select bookmark_cnt, like_cnt, report_cnt, view_cnt from calculet_statistics where calculet_id=${req.params.id};`;

  // 사용자-계산기 관련 정보(북마크 여부, 좋아요 어부) 쿼리문
  const userCalculetQuery = `select liked, bookmarked from user_calculet where calculet_id=${req.params.id};`;

  mariadb.query(
    calculetQuery + statisticsQuery + userCalculetQuery,
    (err, rows, fields) => {
      if (!err) {
        const calculetInfo = rows[0][0];
        const statistics = rows[1][0];
        const userCalculet = rows[2][0];

        // 소스 코드 buffer 형태를 string 으로 변환
        const srcCode = Buffer.from(calculetInfo.src_code).toString();

        // 마크다운 buffer 형태를 string 으로 변환
        const manual = Buffer.from(calculetInfo.manual).toString();

        // 계산기 객체로 묶기
        const calculet = {
          id: calculetInfo.id,
          title: calculetInfo.title,
          srcCode: srcCode,
          manual: manual,
          contributor: calculetInfo.contributor_id,
          description: calculetInfo.description,
        };

        // 통계 객체로 묶기
        const statistic = {
          bookmarkCnt: statistics.bookmark_cnt,
          bookmarked: userCalculet.bookmarked,
          likeCnt: statistics.like_cnt,
          liked: userCalculet.liked,
          reportCnt: statistics.report_cnt,
          viewCnt: statistics.view_cnt,
        };

        console.log(statistic);

        // 계산기 객체와 통계 객체 배열로 묶기
        const result = [calculet, statistic];

        // 프론트엔드에 응답 보내기
        res.send(result);
      } else {
        console.log(`error:${err}`);
        res.send(err);
      }
    }
  );
  // res.send(`calculet ${req.params.id}`);
});

// 계산기 등록
app.post("/calculets/", (req, res) => {});

/**
 * 에러 처리 미들웨어
 */
app.use((err, req, res, next) => {
  console.error(err);
  res.send("에러");
});

app.listen(port, () => {
  console.log(`listening ${port}`);
});
