const express = require("express");
const router = express.Router();
// middleware
const { auth } = require("../../middleware/auth");
const { errorHandler } = require("../../middleware/errorHandler");
// api
const { postProfile } = require("../s3Bucket/profile");
const { signUp } = require("./signUp");
const { me } = require("./getMyInfo");
// resource
const multer = require("multer");
const upload = multer();

/**
 * @swagger
 *  /api/users:
 *    post:
 *      tags: [users]
 *      summary: 회원가입 <Auth>
 *      description: firebase 계정 등록 이후 회원 정보를 서버에 등록함
 *      requestBody:
 *        $ref: "#/components/requestBodies/userInfo"
 *      responses:
 *        201:
 *          $ref: "#/components/responses/success201"
 *        400:
 *          $ref: "#/components/responses/error"
 *        401:
 *          $ref: "#/components/responses/error"
 */
router.post(
  "/",
  [
    upload.single("profileImg"),
    auth.firebase,
    errorHandler.asyncWrapper(postProfile),
  ],
  errorHandler.dbWrapper(signUp)
);

/**
 * @swagger
 *  /api/users/me/profile:
 *    get:
 *      tags: [users]
 *      summary: 로그인 한 사용자 (본인) 프로필 전체 요청 <Auth>
 *      description: 본인 정보 조회
 *      responses:
 *        200:
 *          description: 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/userProfile"
 */
router.get("/me/profile", [auth.firebase, auth.database], me.detail);

/**
 * @swagger
 *  /api/users/me:
 *    get:
 *      tags: [users]
 *      summary: 로그인 한 사용자 (본인) 표시할 정보 요청 <Auth>
 *      description: 본인 정보 조회 (username, profile)
 *      responses:
 *        200:
 *          description: 조회 성공
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/userSimpleInfo"
 */
router.get("/me", [auth.firebase, auth.database], me.default);

module.exports = router;
