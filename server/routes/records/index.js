const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/auth");
const { errorHandler } = require("../../middleware/errorHandler");
const { record } = require("./calculetRecord");
const { body } = require("express-validator");
const { inputValidator } = require("../../middleware/inputValidator");

/**
 * @swagger
 *  /api/records:
 *    post:
 *      tags: [records]
 *      summary: 계산 이력 저장하기 <Auth>
 *      description: 입력값, 결과값을 포함한 계산 이력 저장
 *      requestBody:
 *        $ref: "#/components/requestBodies/saveRecord"
 *      responses:
 *        201:
 *          description: 계산 이력 저장 완료 (응답 데이터 없음)
 *        400:
 *          description: 계산 이력 저장 오류
 *        404:
 *          description: 계산기 찾지 못함
 */
router.post(
  "/",
  [
    auth.validate,
    body("calculetId").isString(),
    body("recordArray").isArray(),
    body("recordArray.*.createdAt").isISO8601(),
    body("recordArray.*.outputObj").isObject(),
    inputValidator,
  ],
  errorHandler.dbWrapper(record.post)
);

/**
 * @swagger
 *  /api/records/{calculetId}:
 *    get:
 *      tags: [records]
 *      summary: 계산 이력 불러오기 <Auth>
 *      description: calculetId 사용 이력을 불러오기
 *      parameters:
 *        - $ref: "#/components/parameters/calculetId"
 *      responses:
 *        200:
 *          $ref: "#/components/responses/getRecord"
 */
router.get("/:calculetId", auth.validate, errorHandler.dbWrapper(record.get));

/**
 * @swagger
 *  /api/records:
 *    delete:
 *      tags: [records]
 *      summary: 계산 이력 삭제하기 <Auth>
 *      description: 따로 검색을 진행하지 않으므로 없는 기록 id 요청해도 정상 응답함
 *      requestBody:
 *        $ref: "#/components/requestBodies/deleteRecord"
 *      responses:
 *        204:
 *          description: 삭제 완료
 */
router.delete(
  "/",
  [
    auth.validate,
    body("calculetId").isString(),
    body("recordIdList").isArray(),
    body("recordIdList.*").isString(),
    inputValidator,
  ],
  errorHandler.dbWrapper(record.delete)
);

module.exports = router;
