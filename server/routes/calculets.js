const express = require("express");
const router = express.Router();
const mariadb = require("../config/database");
const { auth } = require("../middleware/auth");
const cookieParser = require("cookie-parser");
const { category } = require("./calculets/category");
const { DateTimeToString } = require("../utils/StringConverter");

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
 *  /calculets/:
 *    get:
 *      tags: [calculets]
 *      summary: 계산기 전체 목록 불러오기
 *      description: DB에 저장된 계산기의 전체 목록을 카테고리별로 불러온다
 *      responses:
 *        200:
 *          description: 계산기 목록 불러오기 성공
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/getCalculetLists"
 *        404:
 *          description: 계산기를 찾지 못함
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/errorResult"
 *        400:
 *          description: 요청 오류
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/errorResult"
 */
router.get("/", (req, res) => {
  // 계산기 정보 리스트 얻는 쿼리문
  // order by를 통해 카테고리별로 묶음
  const calculetInfoQuery = `select category_main_id, category_sub_id, id, title from calculet_info order by category_main_id, category_sub_id;`;

  // 카테고리 대분류 리스트 얻어오기
  const categoryMainQuery = `select main from category_main;`;

  // 카테고리 소분류 리스트 얻어오기
  const categorySubQuery = `select sub from category_sub;`;

  mariadb.query(
    calculetInfoQuery + categoryMainQuery + categorySubQuery,
    (err, rows, fields) => {
      if (!err) {
        const calculetInfo = rows[0];
        const categoryMain = rows[1];
        const categorySub = rows[2];

        // 계산기 리스트 잘 불러왔다면 -> 카테고리 순서에 맞게 객체로 감싸기
        const calculetLists = [];
        if (calculetInfo) {
          let previousMain =
            categoryMain[calculetInfo[0].category_main_id - 1].main;
          let previousSub = null;
          if (calculetInfo[0].category_sub_id !== null) {
            previousSub = categorySub[calculetInfo[0].category_sub_id - 1].sub;
          }
          let mainItems = [];
          let subItems = [
            { id: calculetInfo[0].id, title: calculetInfo[0].title },
          ];
          for (let i = 1; i < calculetInfo.length; i++) {
            const main =
              categoryMain[calculetInfo[i].category_main_id - 1].main;
            let sub = null;
            if (calculetInfo[i].category_sub_id !== null) {
              sub = categorySub[calculetInfo[i].category_sub_id - 1].sub;
            }
            const content = {
              id: calculetInfo[i].id,
              title: calculetInfo[i].title,
            };

            // 대분류 같은거끼리 묶였다면
            if (previousMain === main) {
              if (previousSub === sub) {
                subItems.push(content);
              } else {
                mainItems.push({
                  categorySub: previousSub,
                  subItems: subItems,
                });
                previousSub = sub;
                subItems = [content];
              }
            } else {
              // 대분류 다르다면
              mainItems.push({ categorySub: previousSub, subItems: subItems });
              calculetLists.push({
                categoryMain: previousMain,
                mainItems: mainItems,
              });
              previousMain = main;
              previousSub = sub;
              subItems = [content];
              mainItems = [];
            }
          }
          mainItems.push({ categorySub: previousSub, subItems: subItems });
          calculetLists.push({
            categoryMain: previousMain,
            mainItems: mainItems,
          });
        }

        // 계산기 리스트 잘 불러왔는지 확인
        if (calculetLists.length === 0) {
          res
            .status(404)
            .send({ success: false, message: "calculet was not found" });
        } else {
          res.status(200).send({
            success: true,
            calculetLists: calculetLists,
          });
        }
      } else {
        res.status(400).send({
          success: false,
          message:
            "request parameters was wrong. retry request after change parameters",
          err,
        });
      }
    }
  );
});

/**
 * DB에 저장된 카테고리를 불러오는 API
 */
router.get("/category", category);

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

  // 계산기 업데이트 로그
  const calculetUpdateLogQuery = `select update_date, message from calculet_update_log where calculet_id=${req.params.id};`;

  // 카테고리 대분류
  const categoryMainQuery = `select * from category_main;`;

  // 카테고리 소분류
  const categorySubQuery = `select * from category_sub;`;

  mariadb.query(
    calculetInfoQuery +
      calculetStatisticsQuery +
      calculetCountQuery +
      userCalculetQuery +
      userInfoQuery +
      calculetUpdateLogQuery +
      categoryMainQuery +
      categorySubQuery,
    (err, rows, fields) => {
      if (!err) {
        const calculetInfo = rows[0][0];
        const calculetStatistics = rows[1][0];
        const calculetCount = rows[2][0];
        let userCalculet = rows[3][0];
        const userInfo = rows[4][0];
        const calculetUpdateLog = rows[5];
        const categoryMain = rows[6];
        const categorySub = rows[7];

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
            categoryMain: categoryMain[calculetInfo.category_main_id - 1].main,
            categorySub: categorySub[calculetInfo.category_sub_id - 1].sub,
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

        // 계산기 정보 팝업에 들어가는 부분 객체로 묶기
        let calculetInfoPopup = null;

        // 업데이트 로그 가공
        let updateLog = [];
        if (calculetUpdateLog.length > 0) {
          // 날짜 같은 계산기 메세지 묶기
          const dictUpdateLog = {};
          for (const log of calculetUpdateLog) {
            const date = DateTimeToString(log.update_date);
            const message = [log.message];
            if (dictUpdateLog[date]) {
              dictUpdateLog[date].push(message);
            } else {
              dictUpdateLog[date] = [message];
            }
          }

          // 객체로 묶기
          for (const key in dictUpdateLog) {
            updateLog.push({ updateDate: key, message: dictUpdateLog[key] });
          }
        }

        if (calculetInfo && calculetCount) {
          // 제작자 이미지를 base64string 으로 변환 + src 생성
          const contributorImgSrc = bufferToImageSrc(userInfo.profile_img);

          calculetInfoPopup = {
            profileImg: contributorImgSrc,
            contributorEmail: calculetInfo.contributor_email,
            calculationCnt: calculetCount.calculation_cnt,
            userCnt: calculetCount.user_cnt,
            title: calculetInfo.title,
            categoryMain: categoryMain[calculetInfo.category_main_id - 1].main,
            categorySub: categorySub[calculetInfo.category_sub_id - 1].sub,
            birthday: DateTimeToString(calculetInfo.birthday),
            updateLog: updateLog,
          };
        }

        // 계산기 잘 불러왔는지 확인
        if (
          calculet === null ||
          statistics === null ||
          calculetInfoPopup === null
        ) {
          res
            .status(404)
            .send({ success: false, message: "calculet was not found" });
        } else {
          res.status(200).send({
            success: true,
            calculet: calculet,
            statistics: statistics,
            info: calculetInfoPopup,
          });
        }
      } else {
        res.status(400).send({
          success: false,
          message:
            "request parameters was wrong. retry request after change parameters",
          err,
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
    "INSERT INTO calculet_info_temp(title, src_code, manual, description, category_main_id, category_sub_id, contributor_email) VALUES(?,?,?,?,?,?,?);";

  const calculet = [
    req.body.title,
    req.body.srcCode,
    req.body.manual,
    req.body.description,
    req.body.categoryMainId,
    req.body.categorySubId,
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
        err,
      });
    }
  });
});

module.exports = router;
