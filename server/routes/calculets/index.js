const express = require("express");
const router = express.Router();
// middleware
const { auth } = require("../../middleware/auth");
const { errorHandler } = require("../../middleware/errorHandler");
const { inputValidator } = require("../../middleware/inputValidator");
// apis
const { getCalculetList } = require("./getCalculetList");
const { getCalculetInfo } = require("./getCalculetInfo");
const { postCalculets } = require("./postCalculets");
const { userLike } = require("./userLike");
const { getUpdateLog } = require("./updateLog");
const { recommendation } = require("./recommend");
const { search } = require("./search");
// modules
const bookmark = require("./bookmark");
const { query, body, param } = require("express-validator");

// bookmark api
router.use(bookmark);

/**
 * @swagger
 *  /api/calculets:
 *    get:
 *      tags: [calculet-list]
 *      summary: 계산기 전체 목록 불러오기
 *      description: DB에 저장된 계산기의 전체 목록을 카테고리별로 불러온다
 *      responses:
 *        200:
 *          $ref: "#/components/responses/getCalculetList"
 *        400:
 *          $ref: "#/components/responses/error"
 */
router.get("/", errorHandler.dbWrapper(getCalculetList.default));

/**
 * @swagger
 *  /api/calculets/converters:
 *    get:
 *      tags: [calculet-list]
 *      summary: 단위변환기 목록 불러오기
 *      description: 계산기 목록 중 소분류가 단위변환기에 속하는 계산기 목록
 *      responses:
 *        200:
 *          $ref: "#/components/responses/getCalculetList"
 *        400:
 *          $ref: "#/components/responses/error"
 */
router.get("/converters", errorHandler.dbWrapper(getCalculetList.converters));

/**
 * @swagger
 *  /api/calculets/recommendation:
 *    get:
 *      tags: [calculet-list]
 *      summary: 추천계산기 목록 불러오기
 *      description: (임시) 조회수 높은 top 15 계산기
 *      responses:
 *        200:
 *          $ref: "#/components/responses/getRecommendationList"
 *        400:
 *          $ref: "#/components/responses/error"
 */
router.get("/recommendation", errorHandler.dbWrapper(recommendation));

/**
 * @swagger
 *  /api/calculets/find:
 *    get:
 *      parameters:
 *        - $ref: "#/components/parameters/categoryMainId"
 *        - $ref: "#/components/parameters/categorySubId"
 *        - $ref: "#/components/parameters/target"
 *        - $ref: "#/components/parameters/keyword"
 *        - $ref: "#/components/parameters/size"
 *        - $ref: "#/components/parameters/page"
 *      tags: [calculet-list]
 *      summary: 계산기 검색 (대분류 / 소분류 / 키워드) - offset pagination
 *      description: 대분류 | 소분류로 검색 필터 설정 가능
 *      responses:
 *        200:
 *          $ref: "#/components/responses/getSearchResult"
 *        400:
 *          $ref: "#/components/responses/error"
 */
router.get(
  "/find",
  // validate & sanitize query value
  [
    query("categoryMainId").optional().isInt().toInt(),
    query("categorySubId").optional().isInt().toInt(),
    query("keyword")
      .optional()
      .blacklist("*")
      .customSanitizer((keyword) =>
        keyword
          .split()
          .map((token) => `*${token}*`)
          .join(" ")
      ),
    query("target").optional().toLowerCase().isIn(["title", "desc", "all"]),
    query("size").isInt({ gt: 0 }).toInt(),
    query("page").isInt({ gt: 0 }).toInt(),
  ],
  errorHandler.dbWrapper(search)
);

/**
 * @swagger
 *  /api/calculets/{calculetId}:
 *    get:
 *      tags: [calculets]
 *      summary: 계산기 불러오기
 *      description: 토큰 정보가 없는 경우 좋아요/북마크는 false로 반환
 *      parameters:
 *        - $ref: "#/components/parameters/calculetId"
 *      responses:
 *        200:
 *          $ref: "#/components/responses/getCalculetInfo"
 *        404:
 *          description: 계산기를 찾지 못함
 *        400:
 *          $ref: "#/components/responses/error"
 */
router.get(
  "/:calculetId",
  auth.verify,
  [param("calculetId").isUUID(), inputValidator],
  errorHandler.dbWrapper(getCalculetInfo)
);

/**
 * @swagger
 *  /api/calculets/update-log/{calculetId}:
 *    get:
 *      tags: [calculets]
 *      summary: 계산기 정보 팝업 - 업데이트 로그
 *      description: 계산기 업데이트 로그 불러오기
 *      parameters:
 *        - $ref: "#/components/parameters/calculetId"
 *      responses:
 *        200:
 *          $ref: "#/components/responses/updateLogList"
 */
router.get(
  "/update-log/:calculetId",
  [param("calculetId").isUUID(), inputValidator],
  errorHandler.dbWrapper(getUpdateLog)
);

/**
 * @swagger
 *  /api/calculets:
 *    post:
 *      tags: [calculets]
 *      summary: 계산기 임시 등록 <Auth>
 *      description: 계산기 등록 전, 보안 검사를 위해 임시 테이블에 등록한다
 *      requestBody:
 *        $ref: "#/components/requestBodies/postCalculet"
 *      responses:
 *        201:
 *          $ref: "#/components/responses/success201"
 *        400:
 *          $ref: "#/components/responses/error"
 */
router.post(
  "/",
  auth.validate,
  // validate & sanitize query value
  [
    body("title").isString(),
    body("srcCode").isString(),
    body("manual").isString(),
    body("description").isString().isLength({
      min: 0,
      max: 100,
    }),
    body("categoryMainId").optional().isInt().toInt(),
    body("categorySubId").optional().isInt().toInt(),
    body("type").optional().isInt({ min: 0, max: 1 }).toInt(),
    inputValidator,
  ],
  errorHandler.dbWrapper(postCalculets)
);

/**
 * @swagger
 *   /api/calculets/like/{calculetId}:
 *    put:
 *      parameters:
 *        - $ref: "#/components/parameters/calculetId"
 *      tags: [like]
 *      summary: 좋아요 등록 <Auth>
 *      description: 로그인한 유저에 대해 계산기 "좋아요" 등록
 *      responses:
 *        200:
 *          $ref: "#/components/responses/likeResult"
 *        400:
 *          $ref: "#/components/responses/likeResult"
 */
router.put(
  "/like/:calculetId",
  auth.validate,
  [param("calculetId").isUUID(), inputValidator],
  errorHandler.dbWrapper(userLike.mark)
);

/**
 * @swagger
 *   /api/calculets/unlike/{calculetId}:
 *    put:
 *      parameters:
 *        - $ref: "#/components/parameters/calculetId"
 *      tags: [like]
 *      summary: 좋아요 취소 <Auth>
 *      description: 로그인한 유저에 대해 계산기 "좋아요" 취소
 *      responses:
 *        200:
 *          $ref: "#/components/responses/likeResult"
 *        400:
 *          $ref: "#/components/responses/likeResult"
 */
router.put(
  "/unlike/:calculetId",
  auth.validate,
  [param("calculetId").isUUID(), inputValidator],
  errorHandler.dbWrapper(userLike.remove)
);

module.exports = router;
