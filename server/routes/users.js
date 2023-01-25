const express = require("express");

const { auth } = require("../middleware/auth");
const { errorHandler } = require("../middleware/errorHandler");

const { postProfile } = require("./s3Bucket/profile");

const { signUp } = require("./users/signUp");
const { me } = require("./users/getMyInfo");

const multer = require("multer");
const upload = multer();

const router = express.Router();
/**
 * @swagger
 *  /api/users:
 *    post:
 *      tags: [users]
 *      summary: 회원가입 <Auth>
 *      description: firebase 계정 등록 이후 회원 정보를 서버에 등록함
 *      requestBody:
 *        description: 회원 정보
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              $ref: "#/components/schemas/postUser"
 *      responses:
 *        301:
 *          description: 회원 등록 완료
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  url:
 *                    type: string
 *                    example: "/"
 *                    description: 루트로 이동
 *        400:
 *          description: 회원 등록 오류 (failed)
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/errorResult"
 *        401:
 *          description: 인증 오류 (invalid token)
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/errorResult"
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
 *                $ref: "#/components/schemas/getSpecificUser"
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
