const express = require("express");
const router = express.Router();
const mariadb = require("../config/database");
const { category } = require("./calculets/category");
const {
  bufferToString,
  bufferToImageSrc,
} = require("../utils/bufferConverter");
const { DateTimeToString } = require("../utils/StringConverter");

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
router.get("/", async (req, res) => {
  try {
    // 기타 id
    const etcId = 99999;
    // 단위 변환기 id
    const converterId = 0;

    // 계산기 리스트
    const calculetLists = [];

    // 카테고리 대분류 리스트 얻어오기
    const categoryMain = await models.categoryMain.findAll({
      where: {
        id: {
          [sequelize.Op.lt]: 99999,
        },
      },
      order: [["id", "ASC"]],
    });
    console.log(categoryMain);

    // 카테고리 소분류 리스트 얻어오기
    const categorySub = await models.categorySub.findAll({
      order: [
        ["main_id", "ASC"],
        ["id", "ASC"],
      ],
    });

    // 대분류 만큼 dictionary 초기화
    for (let i = 0; i < categoryMain.length; i++) {
      calculetLists.push({
        categoryMain: categoryMain[i].main,
        mainItems: [],
      });
    }

    // 소분류 채우는 함수
    async function fillSub(mainId, sub, subId) {
      try {
        const subItemCalculets = await models.calculetInfo.findAll({
          attributes: ["id", "title"],
          where: {
            category_main_id: {
              [sequelize.Op.eq]: mainId,
            },
            category_sub_id: {
              [sequelize.Op.eq]: subId,
            },
          },
        });
        calculetLists[mainId].mainItems.push({
          categorySub: sub,
          subItems: subItemCalculets,
        });
      } catch (error) {
        res.status(400).send({
          success: false,
          message:
            "request parameters was wrong. retry request after change parameters",
          error,
        });
      }
    }
    // 각 대분류마다 단위 변환기 소분류 채우기
    for (let i = 0; i < categoryMain.length - 1; i++) {
      await fillSub(i, "단위 변환기", converterId);

      if (i > 0) {
        await fillSub(0, categoryMain[i].main, converterId);
      }
    }

    // 각 대분류마다 단위 변환기, 기타 제외한 소분류 채우기
    for (let i = 1; i < categorySub.length - 1; i++) {
      const mainId = categorySub[i].main_id;
      const subId = categorySub[i].id;
      const sub = categorySub[i].sub;
      await fillSub(mainId, sub, subId);
    }

    // 각 대분류마다 기타 소분류 채우기 (단위 변환기 제외)
    for (let i = 1; i < categoryMain.length; i++) {
      await fillSub(i, "기타", etcId);
    }

    // console.log(calculetLists);
    res.status(200).send({ success: true, calculetLists: calculetLists });
  } catch (error) {
    res.status(400).send({
      success: false,
      message:
        "request parameters was wrong. retry request after change parameters",
      error: error,
    });
  }
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
router.get("/:id", async (req, res) => {
  // 계산기 정보 쿼리문
  const calculetInfoQuery = `select * from calculet_info where id=${req.params.id};`;

  // 계산기 통계 쿼리문
  const calculetStatisticsQuery = `select bookmark_cnt, like_cnt, report_cnt from calculet_statistics where calculet_id=${req.params.id};`;

  // 계산기 누적 통계 쿼리문
  const calculetCountQuery = `select view_cnt, calculation_cnt, user_cnt from calculet_count where calculet_id=${req.params.id};`;

  // (임시) 사용자-계산기 관련 정보(북마크 여부, 좋아요 여부) 쿼리문
  // 아직 로그인 기능 없어서 버튼 누른 회원 정보 못 얻어오므로 사람 구분은 x
  // const userCalculetQuery = `select liked, bookmarked from user_calculet where calculet_id=${req.params.id};`;

  // 제작자 정보
  const userInfoQuery = `select profile_img, user_name from user_info where id = (select contributor_id from calculet_info where id=${req.params.id});`;

  // 계산기 업데이트 로그
  const calculetUpdateLogQuery = `select created_at, message from calculet_update_log where calculet_id=${req.params.id};`;

  // 카테고리 대분류
  const categoryMainQuery = `select * from category_main where id < 99999 order by id;`;

  // 카테고리 소분류
  const categorySubQuery = `select * from category_sub order by id;`;

  try {
    const rows = await mariadb.query(
      calculetInfoQuery +
        calculetStatisticsQuery +
        calculetCountQuery +
        // userCalculetQuery +
        userInfoQuery +
        calculetUpdateLogQuery +
        categoryMainQuery +
        categorySubQuery
    );

    const calculetInfo = rows[0][0][0];
    const calculetStatistics = rows[0][1][0];
    const calculetCount = rows[0][2][0];
    // let userCalculet = rows[0][3][0];
    const userInfo = rows[0][3][0];
    const calculetUpdateLog = rows[0][4];
    const categoryMain = rows[0][5];
    const categorySub = rows[0][6];

    // (임시) 사용자가 현재 계산기 처음 들어오는 거라면 user-calculet에 데이터 삽입
    // if (!userCalculet) {
    //   userCalculet = {
    //     bookmarked: false,
    //     liked: false,
    //   };
    // }

    // 계산기 객체로 묶기
    let calculet = null;
    if (calculetInfo && userInfo) {
      // 소스 코드 buffer 형태를 string 으로 변환
      const srcCode = bufferToString(calculetInfo.src_code);

      // 마크다운 buffer 형태를 string 으로 변환
      const manual = bufferToString(calculetInfo.manual);

      // 제작자 이미지를 base64string 으로 변환 + src 생성
      let contributorImgSrc = null;
      if (userInfo.profile_img === null) {
        // 기본 이미지인 경우
        contributorImgSrc = "/img/defaultProfile.png";
      } else {
        contributorImgSrc = bufferToImageSrc(userInfo.profile_img);
      }

      calculet = {
        id: calculetInfo.id,
        title: calculetInfo.title,
        srcCode: srcCode,
        manual: manual,
        description: calculetInfo.description,
        contributor: userInfo.user_name,
        contributorImgSrc: contributorImgSrc,
      };
    }

    // 통계 객체로 묶기
    let statistics = null;
    if (calculetStatistics && calculetCount) {
      // && userCalculet) {
      statistics = {
        bookmarkCnt: calculetStatistics.bookmark_cnt,
        // bookmarked: userCalculet.bookmarked,
        likeCnt: calculetStatistics.like_cnt,
        // liked: userCalculet.liked,
        reportCnt: calculetStatistics.report_cnt,
        viewCnt: calculetCount.view_cnt,
      };
    }

    // 계산기 정보 팝업에 들어가는 부분 객체로 묶기
    let calculetInfoPopup = null;

    // 업데이트 로그 가공
    let updateLog = [];
    console.log(calculetUpdateLog.length);
    if (calculetUpdateLog.length > 0) {
      // 날짜 같은 계산기 메세지 묶기
      const dictUpdateLog = {};
      for (const log of calculetUpdateLog) {
        const date = DateTimeToString(log.created_at);
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

    if (calculetInfo && calculetCount && userInfo) {
      // 제작자 이미지를 base64string 으로 변환 + src 생성
      const contributorImgSrc = bufferToImageSrc(userInfo.profile_img);

      const mainIdx = calculetInfo.category_main_id;
      const subIdx = calculetInfo.category_sub_id;
      let main = "기타";
      if (mainIdx < 99999) {
        main = categoryMain[calculetInfo.category_main_id].main;
      }
      let sub = "기타";
      if (subIdx < 99999) {
        sub = categorySub[calculetInfo.category_sub_id].sub;
      }

      calculetInfoPopup = {
        profileImg: contributorImgSrc,
        contributorName: userInfo.user_name,
        calculationCnt: calculetCount.calculation_cnt,
        userCnt: calculetCount.user_cnt,
        title: calculetInfo.title,
        categoryMain: main,
        categorySub: sub,
        birthday: DateTimeToString(calculetInfo.created_at),
        updateLog: updateLog,
      };
    }

    // 계산기 잘 불러왔는지 확인
    if (
      calculet === null ||
      statistics === null ||
      calculetInfoPopup === null
    ) {
      res.status(404).send({ success: false, message: "calculet not found" });
    } else {
      res.status(200).send({
        success: true,
        calculet: calculet,
        statistics: statistics,
        info: calculetInfoPopup,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message:
        "request parameters was wrong. retry request after change parameters",
      err,
    });
  }
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
router.post("/", async (req, res) => {
  const sql =
    "INSERT INTO calculet_info_temp(title, src_code, manual, description, category_main_id, category_sub_id, contributor_id) VALUES(?,?,?,?,?,?,?);";

  const calculet = [
    req.body.title,
    req.body.srcCode,
    req.body.manual,
    req.body.description,
    req.body.categoryMainId,
    req.body.categorySubId,
    req.body.id,
  ];
  try {
    const rows = await mariadb.query(sql, calculet);
    res
      .status(201)
      .send({ success: true, location: `/calculets/${rows[0].insertId}` });
  } catch (err) {
    res.status(400).send({
      success: false,
      message:
        "request parameters was wrong. retry request after change parameters",
      err,
    });
  }
});

module.exports = router;
