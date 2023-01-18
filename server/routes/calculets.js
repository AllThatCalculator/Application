const express = require("express");
const router = express.Router();
const { category } = require("./calculets/category");
const { registerCalculet } = require("./calculets/register");

const { models } = require("../models");
const { auth } = require("../middleware/auth");
const sequelize = require("sequelize");
const { errorHandler } = require("../middleware/errorHandler");
const { getCalculetInfo } = require("./calculets/getCalculetInfo");

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
 *      description: id번 계산기를 DB에서 조회한 후 불러오기
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
 *        400:
 *          description: 계산기 요청 오류
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/errorResult"
 */
router.get("/:id", errorHandler.dbWrapper(getCalculetInfo));

/**
 * @swagger
 *  /api/calculets/:
 *    post:
 *      tags: [calculets]
 *      summary: 계산기 임시 등록 <Auth>
 *      description: 계산기 등록 전, 보안 검사를 위해 임시 테이블에 등록한다
 *      requestBody:
 *        description: 계산기 정보
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/calculet"
 *      responses:
 *        301:
 *          description: 계산기 등록 완료 -> 루트로 디라이렉션
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/success301"
 *        400:
 *          description: 계산기 등록 요청 오류
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/errorResult"
 */
router.post(
  "/",
  [auth.firebase, auth.database],
  errorHandler.dbWrapper(registerCalculet)
);

module.exports = router;
