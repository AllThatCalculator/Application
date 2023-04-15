const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { admin } = require("../config/firebase");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { models } = require("../models");
const { deleteUser } = require("./users/deleteUser");
const { CustomError } = require("../utils/CustomError");

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
router.post("/update-log", auth.validate, async (req, res) => {
  const calculet = await models.calculetInfo.findByPk(req.body.calculetId);
  if (calculet.contributorId !== res.locals.userId) {
    throw new CustomError(403, 0);
  }

  await models.calculetUpdateLog.create(
    {
      message: req.body.message,
      calculetId: req.body.calculetId,
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
router.post("/calculets", auth.validate, async (req, res) => {
  const calculet = await models.calculetInfo.create({
    id: uuidv4(),
    title: req.body.title,
    srcCode: req.body.srcCode,
    manual: req.body.manual,
    description: req.body.description,
    categoryMainId: req.body.categoryMainId,
    categorySubId: req.body.categorySubId,
    contributorId: res.locals.userId,
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
router.delete("/users", auth.validate, async (req, res) => {
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
router.delete("/users/database", auth.validate, async (req, res) => {
  try {
    await deleteUser.database(res.locals.userId);
    res.status(200).send(`user "${res.locals.email}" deleted from database`);
  } catch (error) {
    res.status(400).send("request failed");
  }
});

// admin 정보 삭제되니 주의할 것
// /**
//  * @swagger
//  *  /api/test/register-all:
//  *    get:
//  *      tags: [TEST]
//  *      summary: 유저 등록 (admin 정보 삭제되니 주의할 것)
//  *      description: DB에 있는 모든 유저를 상대로 firebase custom claim에 등록 설정 (admin 정보 삭제되니 주의할 것)
//  *      responses:
//  *        200:
//  *          description: 완료 (결과는 터미널 로그 확인)
//  */
// router.get("/register-all", async (req, res) => {
//   const userList = await models.userInfo.findAll();
//   Promise.all(userList.map(async (user) => {
//     await admin.auth().setCustomUserClaims(user.id, { registered: true })
//       .then(() => console.log(`${user.id} completed`))
//       .catch((err) => {
//         console.log(`${user.id} failed`);
//         console.log(err);
//       });
//   }));

//   res.status(200).send();
// });

/**
 * @swagger
 *  /api/test/login:
 *    post:
 *      tags: [TEST]
 *      summary: 토큰 발급받기
 *      description: email/password 기반으로 firebase에서 idToken 발급
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *                password:
 *                  type: string
 *      responses:
 *        200:
 *          description: 성공
 */
router.post("/login", async (req, res) => {
  const { idToken } = await auth.postFirebase(
    req.body.email,
    req.body.password
  );
  res.status(200).send(idToken);
});

// /**
//  * @swagger
//  *  /api/test/admin-setting:
//  *    get:
//  *      tags: [TEST]
//  *      summary: 관리자 유저 등록
//  *      description: firebase에 관리자로 등록된 유저를 DB에 기록
//  *      responses:
//  *        200:
//  *          description: 완료 (결과는 터미널 로그 확인)
//  */
// router.get("/admin-setting", async (req, res) => {

//   const { users } = await admin.auth().listUsers();

//   Promise.all(users.map(async (userData) => {
//     // console.log(userData.customClaims);
//     if (!!userData.customClaims?.admin) {
//       const { email, userName } = await models.userInfo.findByPk(userData.uid, {
//         attributes: ["email", "userName"],
//       });
//       const data = {
//         id: userData.uid,
//         email,
//         accessLevel: userData.customClaims.accessLevel
//       };
//       await models.admin.create(data);
//       console.log(`${userName} recorded`, data);

//     }
//   }));

//   res.status(200).send();
// });

module.exports = router;
