const express = require("express");
const { auth } = require("../middleware/auth");
const { findUser } = require("../middleware/findUser");
const { signUp } = require("./users/signUp");
const { login } = require("./users/login");
const { me } = require("./users/me");
const { logout } = require("./users/logout");
const { refresh } = require("./users/refresh");
const { bufferToImageSrc } = require("../utils/bufferConverter");
const mariadb = require("../config/database");

const router = express.Router();

/**
 * 회원 가입
 */
router.post("/", findUser, signUp);

/**
 * 로그인 요청
 */
router.post("/login", login);

/**
 * 로그인한 사용자인지 인증 (인가)
 */
router.get("/me", auth, me);

/**
 * 로그아웃
 */
router.get("/logout", logout);

/**
 * refresh token을 통해 access token 재발급하는 모듈 (현재는 쓰고 있지 않음)
 */
router.get("/refresh", refresh);

/**
 * @swagger
 *  /users/{email}:
 *    get:
 *      tags: [users]
 *      summary: 특정 유저 정보 조회
 *      description: email과 일치하는 유저 찾아서 정보 조회
 *      parameters:
 *        - in: path
 *          type: string
 *          required: true
 *          name: email
 *          description: 사용자 이메일
 *      responses:
 *        200:
 *          description: 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/getSpecificUser"
 *        404:
 *          description: 유저를 찾지 못함
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
router.get("/:email", async (req, res) => {
  try {
    // 사용자 정보 쿼리문
    const userInfoQuery = `select * from user_info where email='${req.params.email}';`;

    const rows = await mariadb.query(userInfoQuery);
    const userInfo = rows[0][0];

    let user = null;
    if (userInfo) {
      // 사용자 이미지를 base64string 으로 변환 + src 생성
      const profileImgSrc = bufferToImageSrc(userInfo.profile_img);

      user = {
        email: userInfo.email,
        userName: userInfo.user_name,
        profileImg: profileImgSrc,
        bio: userInfo.bio,
        sex: userInfo.sex,
        birthdate: userInfo.birthdate,
        job: userInfo.job,
      };
    }

    if (user === null) {
      res.status(404).send({ success: false, message: "user was not found" });
    } else {
      res.status(200).send({
        success: true,
        userInfo: user,
      });
    }
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
