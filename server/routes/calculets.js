const express = require("express");
const router = express.Router();
const mariadb = require("../config/database");

/**
 * body에 싸서 온 데이터에 접근하기 위해 필요한 부분
 */
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

/**
 * buffer 데이터를 string 형태로 바꿔주는 함수
 * @param {buffer}
 * value: buffer 상태 데이터
 * @returns
 */
function bufferToString(value) {
  return Buffer.from(value).toString();
}

/**
 * buffer 데이터(이미지)를 base64String으로 인코딩해서 src 생성하는 함수
 * @param {buffer}
 * value: buffer 상태 데이터 (이미지)
 * @returns
 */
function bufferToImageSrc(value) {
  const base64String = Buffer.from(value).toString("base64");
  return `data:image/png;base64,${base64String}`;
}

/**
 * 계산기 불러오는 get 요청
 */
router.get("/:id", (req, res) => {
  // 계산기 정보 쿼리문
  const calculetQuery = `select id, title, src_code, manual, description, contributor_id from calculet_info where id=${req.params.id};`;

  // 계산기 통계 쿼리문
  const statisticsQuery = `select bookmark_cnt, like_cnt, report_cnt, view_cnt from calculet_statistics where calculet_id=${req.params.id};`;

  // (임시) 사용자-계산기 관련 정보(북마크 여부, 좋아요 어부) 쿼리문
  // 아직 로그인 기능 없어서 버튼 누른 회원 정보 못 얻어오므로 사람 구분은 x
  const userCalculetQuery = `select liked, bookmarked from user_calculet where calculet_id=${req.params.id};`;

  // 제작자 사진
  const contributorQuery = `select profile_img from user_info where id = (select contributor_id from calculet_info where id=${req.params.id});`;

  mariadb.query(
    calculetQuery + statisticsQuery + userCalculetQuery + contributorQuery,
    (err, rows, fields) => {
      if (!err) {
        const calculetInfo = rows[0][0];
        const statistics = rows[1][0];
        let userCalculet = rows[2][0];
        const contributor = rows[3][0];

        // (임시) 사용자가 현재 계산기 처음 들어오는 거라면 user-calculet에 데이터 삽입
        if (!userCalculet) {
          userCalculet = {
            bookmarked: false,
            liked: false,
          };
        }

        // 계산기 객체로 묶기
        let calculet = null;
        if (calculetInfo) {
          // 소스 코드 buffer 형태를 string 으로 변환
          const srcCode = bufferToString(calculetInfo.src_code);

          // 마크다운 buffer 형태를 string 으로 변환
          const manual = bufferToString(calculetInfo.manual);

          // 제작자 이미지를 base64string 으로 변환 + src 생성
          const contributorImgSrc = bufferToImageSrc(contributor.profile_img);

          calculet = {
            id: calculetInfo.id,
            contributorImgSrc: contributorImgSrc,
            title: calculetInfo.title,
            srcCode: srcCode,
            manual: manual,
            contributor: calculetInfo.contributor_id,
            description: calculetInfo.description,
          };
        }

        // 통계 객체로 묶기
        let statistic = null;
        if (statistics && userCalculet) {
          statistic = {
            bookmarkCnt: statistics.bookmark_cnt,
            bookmarked: userCalculet.bookmarked,
            likeCnt: statistics.like_cnt,
            liked: userCalculet.liked,
            reportCnt: statistics.report_cnt,
            viewCnt: statistics.view_cnt,
          };
        }

        // 계산기 잘 불러왔는지 확인
        if (calculet === null || statistic === null) {
          res.status(404).send("calculet was not found");
        } else {
          const result = [calculet, statistic];
          res.send(result);
        }
      } else {
        console.log(`error:${err}`);
        res.send(err);
      }
    }
  );
});

/**
 * 계산기 등록하는 post 요청
 */
router.post("/", (req, res) => {
  // 계산기 정보 삽입문
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
    req.body.srcCode,
    req.body.manual,
    req.body.description,
    req.body.categoryMain,
    req.body.categorySub,
    req.body.email,
  ];

  mariadb.query(sql, calculet, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
      console.log(rows);
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
