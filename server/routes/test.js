const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { models } = require("../models");

/**
 * @swagger
 *  /api/test/update-log:
 *    post:
 *      tags: [TEST(Backend)]
 *      summary: 업데이트 로그 더미 데이터 등록용
 *      description: 업데이트 로그 더미 데이터 등록용
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/updateLog"
 *      responses:
 *        200:
 *          description: 등록 성공
 */
router.post("/update-log", async (req, res) => {
  await models.calculetUpdateLog.create(
    {
      message: req.body.message,
      calculet_id: req.body.calculetId,
    },
    { silent: true }
  );
  res.status(200).send();
});

/**
 * @swagger
 *  /api/test/calculets:
 *    post:
 *      tags: [TEST(Backend)]
 *      summary: 더미 계산기 등록용 API (임시 테이블 거치지 않음)
 *      description: 더미 계산기 등록용 API (임시 테이블 거치지 않음)
 *      requestBody:
 *        $ref: "#/components/requestBodies/postCalculet"
 *      responses:
 *        308:
 *          $ref: "#/components/responses/postCalculet"
 */
router.post("/calculets", auth.firebase, async (req, res) => {
  console.log(uuidv4());
  const calculet = await models.calculetInfo.create({
    id: uuidv4(),
    title: req.body.title,
    src_code: req.body.srcCode,
    manual: req.body.manual,
    description: req.body.description,
    category_main_id: req.body.categoryMainId,
    category_sub_id: req.body.categorySubId,
    contributor_id: res.locals.userId,
  });
  res.send(308, `/${calculet.id}`);
});

module.exports = router;
