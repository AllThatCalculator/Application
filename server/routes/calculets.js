const express = require("express");
const router = express.Router();
const { category } = require("./calculets/category");
const {
  bufferToString,
  bufferToImageSrc,
} = require("../utils/bufferConverter");
const { DateTimeToString } = require("../utils/StringConverter");
const { models } = require("../models");
const { auth } = require("../middleware/auth");
const sequelize = require("sequelize");

/**
 * @swagger
 *  /api/calculets/:
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
 *  /api/calculets/{id}:
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
  try {
    // 계산기 정보 (유저와 카테고리 대분류, 소분류와 조인)
    const calculetInfo = await models.calculetInfo.findOne({
      include: [
        {
          model: models.userInfo,
          required: true,
          attributes: ["user_name", "profile_img"],
          as: "contributor",
        },
        {
          model: models.categorySub,
          required: true,
          attributes: ["sub"],
          as: "category_sub",
          include: [
            {
              model: models.categoryMain,
              required: true,
              attributes: ["main"],
              as: "main",
            },
          ],
        },
      ],
      where: {
        id: {
          [sequelize.Op.eq]: req.params.id,
        },
      },
    });

    console.log(calculetInfo);

    // 계산기 통계
    const calculetStatistics = await models.calculetStatistics.findOne({
      attributes: ["bookmark_cnt", "like_cnt", "report_cnt"],
      where: {
        calculet_id: {
          [sequelize.Op.eq]: req.params.id,
        },
      },
    });
    // 계산기 조회수
    const calculetCount = await models.calculetCount.findOne({
      attributes: ["view_cnt", "calculation_cnt", "user_cnt"],
      where: {
        calculet_id: {
          [sequelize.Op.eq]: req.params.id,
        },
      },
    });
    // (임시) 사용자-계산기 관련 정보(북마크 여부, 좋아요 여부)
    const userCalculet = {
      bookmarked: false,
      liked: false,
    };
    // 계산기 업데이트 로그
    const calculetUpdateLog = await models.calculetUpdateLog.findAll({
      attributes: ["created_at", "message"],
      where: {
        calculet_id: {
          [sequelize.Op.eq]: req.params.id,
        },
      },
    });

    // 계산기 객체로 묶기
    let calculet = null;
    if (calculetInfo) {
      // 소스 코드 buffer 형태를 string 으로 변환
      const srcCode = bufferToString(calculetInfo.src_code);

      // 마크다운 buffer 형태를 string 으로 변환
      const manual = bufferToString(calculetInfo.manual);

      // 제작자 이미지를 base64string 으로 변환 + src 생성
      let contributorImgSrc = null;
      if (calculetInfo.contributor.profile_img === null) {
        // 기본 이미지인 경우
        contributorImgSrc = "/img/defaultProfile.png";
      } else {
        contributorImgSrc = bufferToImageSrc(
          calculetInfo.contributor.profile_img
        );
      }

      calculet = {
        id: calculetInfo.id,
        title: calculetInfo.title,
        srcCode: srcCode,
        manual: manual,
        description: calculetInfo.description,
        contributor: calculetInfo.contributor.user_name,
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

    if (calculetInfo && calculetCount) {
      // 제작자 이미지를 base64string 으로 변환 + src 생성
      const contributorImgSrc = bufferToImageSrc(
        calculetInfo.contributor.profile_img
      );

      calculetInfoPopup = {
        profileImg: contributorImgSrc,
        contributorName: calculetInfo.contributor.user_name,
        calculationCnt: calculetCount.calculation_cnt,
        userCnt: calculetCount.user_cnt,
        title: calculetInfo.title,
        categoryMain: calculetInfo.category_sub.main.main,
        categorySub: calculetInfo.category_sub.sub,
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
 *  /api/calculets/:
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
router.post("/", auth, async (req, res) => {
  try {
    const calculetInfoTemp = models.calculetInfoTemp.create({
      title: req.body.title,
      src_code: req.body.srcCode,
      manual: req.body.manual,
      description: req.body.description,
      category_main_id: req.body.categoryMainId,
      category_sub_id: req.body.categorySubId,
      contributor_id: req.body.id,
    });
    res.status(201).send({
      success: true,
      location: `/calculets/${calculetInfoTemp.id}`,
    });
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
