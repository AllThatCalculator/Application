const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { admin } = require("../config/firebase");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { models } = require("../models");
const { errorObject } = require("../utils/errorMessage");
const { deleteUser } = require("./users/deleteUser");

/**
 * @swagger
 *  /api/test/update-log:
 *    post:
 *      tags: [TEST]
 *      summary: 업데이트 로그 더미 데이터 등록용 <Auth>
 *      description: 해당 유저가 작성한 계산기에 대한 업데이트 로그만 등록 가능
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
router.post("/update-log", [auth.firebase, auth.database], async (req, res) => {
  const calculet = await models.calculetInfo.findByPk(req.body.calculetId);
  if (calculet.user_id !== res.locals.userId) {
    res.status(403).send(errorObject(403, 0));
  }

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
 *      tags: [TEST]
 *      summary: 더미 계산기 등록용 API (임시 테이블 거치지 않음) <Auth>
 *      description: 더미 계산기 등록용 API (임시 테이블 거치지 않음)
 *      requestBody:
 *        $ref: "#/components/requestBodies/postCalculet"
 *      responses:
 *        201:
 *          $ref: "#/components/responses/success201"
 */
router.post("/calculets", [auth.firebase, auth.database], async (req, res) => {
  const categoryId = await getCategoryId(req.body.categoryMainId, req.body.categorySubId);
  const calculet = await models.calculetInfo.create({
    id: uuidv4(),
    title: req.body.title,
    src_code: req.body.srcCode,
    manual: req.body.manual,
    description: req.body.description,
    category_id: categoryId,
    contributor_id: res.locals.userId,
  });
  res.send(201, `/${calculet.id}`);

  console.log(`${calculet.id} registered complete`);
});

/**
 * @swagger
 *  /api/test/users:
 *    delete:
 *      tags: [TEST]
 *      summary: (주의!!!) 유저 삭제 API (complete) <Auth>
 *      description: firebase & database에서 모두 회원 정보를 삭제한다. 유저와 관련된 모든 정보 - 계산기, 계산이력, 좋아요, 북마크 등이 삭제된다.
 *      responses:
 *        200:
 *          description: 회원 정보 삭제 완료
 */
router.delete("/users", auth.firebase, async (req, res) => {
  try {
    await deleteUser.database(res.locals.userId);
    await deleteUser.firebase(res.locals.userId);
    res
      .status(200)
      .send(`user "${res.locals.email}" deleted from firebase & database`);
  } catch (error) {
    console.error(error);
    res.status(400).send("request failed");
  }
});

/**
 * @swagger
 *  /api/test/users/database:
 *    delete:
 *      tags: [TEST]
 *      summary: 유저 삭제 API (only database) <Auth>
 *      description: database에서 정보 삭제, firebase 회원은 유지된다.
 *      responses:
 *        200:
 *          description: 회원 정보 삭제 완료
 */
router.delete(
  "/users/database",
  [auth.firebase, auth.database],
  async (req, res) => {
    try {
      await deleteUser.database(res.locals.userId);
      res.status(200).send(`user "${res.locals.email}" deleted from database`);
    } catch (error) {
      res.status(400).send("request failed");
    }
  }
);
module.exports = router;
