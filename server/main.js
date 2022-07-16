const express = require("express");
const mariadb = require("./config/database");
const bodyParser = require("body-parser");

const app = express();

const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("this is from backend server");
});

app.get("/calculets/:id", (req, res) => {
  // 계산기 정보 쿼리문
  const calculetQuery = `select id, title, src_code, manual, description, contributor_id from calculet_info where id=${req.params.id};`;

  // 계산기 통계 쿼리문
  const statisticsQuery = `select bookmark_cnt, like_cnt, report_cnt, view_cnt from calculet_statistics where calculet_id=${req.params.id};`;

  // 사용자-계산기 관련 정보(북마크 여부, 좋아요 어부) 쿼리문
  // 아직 로그인 기능 없어서 버튼 누른 회원 정보 못 얻어오므로 사람 구분은 x
  const userCalculetQuery = `select liked, bookmarked from user_calculet where calculet_id=${req.params.id};`;

  // 제작자 사진
  const userProfile = `select profile_img from user_info where id = (select contributor_id from calculet_info where id=${req.params.id});`;

  mariadb.query(
    calculetQuery + statisticsQuery + userCalculetQuery + userProfile,
    (err, rows, fields) => {
      if (!err) {
        const calculetInfo = rows[0][0];
        const statistics = rows[1][0];
        const userCalculet = rows[2][0];
        const userProfileImg = rows[3][0].profile_img;

        // console.log(userProfileImg);

        // 소스 코드 buffer 형태를 string 으로 변환
        const srcCode = Buffer.from(calculetInfo.src_code).toString();

        // 마크다운 buffer 형태를 string 으로 변환
        const manual = Buffer.from(calculetInfo.manual).toString();

        // 제작자 이미지를 base64string 으로 변환 + src 생성
        const base64String = Buffer.from(userProfileImg).toString("base64");
        const contributorImgSrc = `data:image/png;base64,${base64String}`;

        // console.log(base64String);

        // 계산기 객체로 묶기
        const calculet = {
          id: calculetInfo.id,
          contributorImgSrc: contributorImgSrc,
          title: calculetInfo.title,
          srcCode: srcCode,
          manual: manual,
          contributor: calculetInfo.contributor_id,
          description: calculetInfo.description,
        };

        if (statistics) {
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
          res.send([calculet]);
        }
      } else {
        console.log(`error:${err}`);
        res.send(err);
      }
    }
  );
  // res.send(`calculet ${req.params.id}`);
});

// 계산기 등록
app.post("/calculets", (req, res) => {
  const sql =
    "INSERT INTO calculet_info(title, src_code, manual, description, category_main, category_sub, contributor_id) VALUES(?,?,?,?,?,?,?);";

  /**
   * - 계산기 이름 `title`
   * - 계산기 코드 `src_code`
   * - 계산기 설명 마크다운 `manual`
   * - 계산기 한 줄 설명 `description`
   * - 카테고리 대분류 `category_main`
   * - 카테고리 소분류 `category_sub`
   * - 제작자 이메일 `contributor_email`
   */
  const calculet = [
    req.body.title,
    req.body.htmlScript,
    req.body.markdown,
    req.body.description,
    req.body.bigCategory,
    req.body.smallCategory,
    req.body.email,
  ];

  console.log(calculet);

  mariadb.query(sql, calculet, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
      console.log(rows);
    } else {
      console.log(err);
    }
  });
});

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
