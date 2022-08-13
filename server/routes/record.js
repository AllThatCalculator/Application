const express = require("express");
const router = express.Router();
const Record = require("../mongoDB/recordModel");
const { auth } = require("../middleware/auth");

/**
 * @swagger
 *  /record/:
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
 *          description: 계산 이력 저장 완료
 *        400:
 *          description: 계산 이력 저장 오류
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/errorResult"
 *        401:
 *          description: 로그인 오류
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/errorResult"
 */
router.post("/", auth, (req, res) => {
  // 새로운 기록 객체 생성
  const newRecord = new Record({
    userEmail: req.email,
    calculetId: req.body.calculetId,
    inputObj: req.body.inputObj,
    outputObj: req.body.outputObj,
  });

  // 기록 저장
  newRecord
    .save()
    .then(() => {
      res.status(201).send({ message: "Record saved" });
    })
    .catch(() => res.status(400).send({ message: "Failed to save record." }));
});
/**
 * @swagger
 *  /record/{calculetId}:
 *    get:
 *      tags: [record]
 *      summary: 계산 이력 불러오기
 *      description: userEmail의 calculetId 사용 이력을 불러오기
 *      parameters:
 *        - in: path
 *          name: calculetId
 *          type: int
 *          required: true
 *          description: 계산기 번호
 *      responses:
 *        200:
 *          description: 계산이력 조회 성공
 *          content:
 *            record/json:
 *              schema:
 *                $ref: "#/components/schemas/getRecord"
 *        400:
 *          description: 계산이력 조회 오류
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/errorResult"
 *        401:
 *          description: 로그인 오류
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/errorResult"
 */
router.get("/", auth, (req, res) => {
  // 해당 이력 검색
  Record.find({
    userEmail: req.email,
    calculetId: req.query.calculetId,
  })
    .then((recordList) => {
      // 데이터 가공
      recordList = recordList.map((row) => {
        const { inputObj, outputObj, createdAt } = row;
        return {
          inputObj: inputObj,
          outputObj: outputObj,
          createdAt: createdAt,
        };
      });

      // 최신순 정렬
      recordList.sort((a, b) => a.createdAt < b.createdAt);
      res.status(200).send({ recordList });
    })
    .catch(() => {
      res.status(400).send({
        message:
          "request parameters was wrong. retry request after change parameters",
      });
    });
});

module.exports = router;
