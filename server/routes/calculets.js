const express = require("express");
const router = express.Router();
const mariadb = require("../config/database");
const { auth } = require("../middleware/auth");
const cookieParser = require("cookie-parser");

/**
 * body에 싸서 온 데이터에 접근하기 위해 필요한 부분
 */
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(cookieParser());

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
 * @swagger
 *  /calculets/{id}:
 *    get:
 *      tags: [calculets]
 *      summary: 계산기 불러오기
 *      description: id 번째 계산기를 DB에서 조회한 후 불러오기
 *      parameters:
 *        - in: path
 *          type: string
 *          required: true
 *          name: id
 *          description: 계산기 번호
 *      responses:
 *        200:
 *          description: 계산기 불러오기 성공
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/getSpecificCalculet"
 *        404:
 *          description: 계산기를 찾지 못함
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/errorResult"
 *        400:
 *          description: 계산기 요청 오류
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/errorResult"
 */
router.get("/:id", (req, res) => {
  // 계산기 정보 쿼리문
  const calculetInfoQuery = `select * from calculet_info where id=${req.params.id};`;

  // 계산기 통계 쿼리문
  const calculetStatisticsQuery = `select bookmark_cnt, like_cnt, report_cnt from calculet_statistics where calculet_id=${req.params.id};`;

  // 계산기 누적 통계 쿼리문
  const calculetCountQuery = `select view_cnt, calculation_cnt, user_cnt from calculet_count where calculet_id=${req.params.id};`;

  // (임시) 사용자-계산기 관련 정보(북마크 여부, 좋아요 여부) 쿼리문
  // 아직 로그인 기능 없어서 버튼 누른 회원 정보 못 얻어오므로 사람 구분은 x
  const userCalculetQuery = `select liked, bookmarked from user_calculet where calculet_id=${req.params.id};`;

  // 제작자 사진
  const userInfoQuery = `select profile_img from user_info where email = (select contributor_email from calculet_info where id=${req.params.id});`;

  mariadb.query(
    calculetInfoQuery +
      calculetStatisticsQuery +
      calculetCountQuery +
      userCalculetQuery +
      userInfoQuery,
    (err, rows, fields) => {
      if (!err) {
        const calculetInfo = rows[0][0];
        const calculetStatistics = rows[1][0];
        const calculetCount = rows[2][0];
        let userCalculet = rows[3][0];
        const userInfo = rows[4][0];

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
          const contributorImgSrc = bufferToImageSrc(userInfo.profile_img);

          calculet = {
            id: calculetInfo.id,
            title: calculetInfo.title,
            srcCode: srcCode,
            manual: manual,
            description: calculetInfo.description,
            categoryMain: calculetInfo.category_main,
            categorySub: calculetInfo.category_sub,
            contributor: calculetInfo.contributor_email,
            contributorImgSrc: contributorImgSrc,
          };
        }

        // 통계 객체로 묶기
        let statistics = null;
        if (calculetStatistics && calculetCount && userCalculet) {
          statistics = {
            bookmarkCnt: calculetStatistics.bookmark_cnt,
            bookmarked: userCalculet.bookmarked,
            likeCnt: calculetStatistics.like_cnt,
            liked: userCalculet.liked,
            reportCnt: calculetStatistics.report_cnt,
            viewCnt: calculetCount.view_cnt,
          };
        }

        // 계산기 잘 불러왔는지 확인
        if (calculet === null || statistics === null) {
          res
            .status(404)
            .send({ success: false, message: "calculet was not found" });
        } else {
          res.status(200).send({
            success: true,
            calculet: calculet,
            statistics: statistics,
          });
        }
      } else {
        res.status(400).send({
          success: false,
          message:
            "request parameters was wrong. retry request after change parameters",
        });
      }
    }
  );
});

/**
 * @swagger
 *  /calculets/:
 *    post:
 *      tags: [calculets]
 *      summary: 계산기 임시 등록
 *      description: 계산기 등록 전, 보안 검사를 위해 임시 테이블에 등록한다
 *      requestBody:
 *        description: 계산기 정보
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/registerCalculetTemp"
 *      responses:
 *        201:
 *          description: 계산기 등록 완료
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/postResult"
 *        400:
 *          description: 계산기 등록 요청 오류
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/errorResult"
 */
router.post("/", auth, (req, res) => {
  const sql =
    "INSERT INTO calculet_info_temp(title, src_code, manual, description, category_main, category_sub, contributor_email) VALUES(?,?,?,?,?,?,?);";

  const calculet = [
    req.body.title,
    req.body.srcCode,
    req.body.manual,
    req.body.description,
    req.body.categoryMain,
    req.body.categorySub,
    req.body.email,
  ];

  mariadb.query(sql, calculet, (err, result, fields) => {
    if (!err) {
      res
        .status(201)
        .send({ success: true, location: `/calculets/${result.insertId}` });
    } else {
      res.status(400).send({
        success: false,
        message:
          "request parameters was wrong. retry request after change parameters",
      });
    }
  });
});

module.exports = router;
