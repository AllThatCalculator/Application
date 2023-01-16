const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { errorHandler } = require("../middleware/errorHandler");
const { models } = require("../models");

/**
 * @swagger
 *  /api/record/:
 *    post:
 *      tags: [record]
 *      summary: 계산 이력 저장하기
 *      description: 입력값, 결과값을 포함한 계산 이력 저장
 *      requestBody:
 *        description: 계산기 정보
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/saveRecord"
 *      responses:
 *        201:
 *          description: 계산 이력 저장 완료 (데이터 없음)
 *        400:
 *          description: 계산 이력 저장 오류
 *        401:
 *          description: 로그인 오류
 */
router.post(
  "/",
  [auth.firebase, auth.database],
  errorHandler.dbWrapper(async (req, res) => {
    // 새로운 기록 객체 생성
    await models.calculetRecord.create({
      user_id: res.locals.userId,
      calculet_id: req.body.calculetId,
      input: JSON.stringify(req.body.inputObj),
      output: JSON.stringify(req.body.outputObj),
    });

    console.log("new record created");
    res.status(201).send();
  })
);

/**
 * @swagger
 *  /api/record/{calculetId}:
 *    get:
 *      tags: [record]
 *      summary: 계산 이력 불러오기
 *      description: userEmail의 calculetId 사용 이력을 불러오기
 *      parameters:
 *        - in: path
 *          name: calculetId
 *          type: string
 *          required: true
 *          description: 계산기 번호 (UUID)
 *      responses:
 *        200:
 *          description: 계산이력 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/getRecord"
 *        400:
 *          description: 계산이력 조회 오류
 *        401:
 *          description: 로그인 오류
 */
router.get(
  "/:id",
  [auth.firebase, auth.database],
  errorHandler.dbWrapper(async (req, res) => {
    let recordList = await models.calculetRecord.findAll({
      attributes: ["input", "output", "created_at"],
      where: {
        calculet_id: {
          [sequelize.Op.eq]: req.params.id,
        },
        user_id: {
          [sequelize.Op.eq]: res.locals.userId,
        },
      },
    });

    // 데이터 가공
    recordList = recordList.map((row) => {
      return {
        inputObj: JSON.parse(row.dataValues.input),
        outputObj: JSON.parse(row.dataValues.output),
        createdAt: row.dataValues.created_at,
      };
    });
    // 최신순 정렬
    recordList.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return 1;
      } else if (a.createdAt > b.createdAt) {
        return -1;
      } else {
        return 0;
      }
    });

    res.status(200).send(recordList);
  })
);

module.exports = router;
