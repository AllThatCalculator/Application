const express = require("express");
const router = express.Router();
// middleware
const { auth } = require("../../middleware/auth");
const { errorHandler } = require("../../middleware/errorHandler");
const { inputValidator } = require("../../middleware/inputValidator");
// api
const { postProfile, deleteProfile } = require("../s3Bucket/profile");
const { signUp } = require("./signUp");
const { updateUser } = require("./updateUser");
const { deleteUser } = require("./deleteUser");
const { me } = require("./getMyInfo");
const { getMyCalculetInfo } = require("./getMyCalculetInfo");
const { getMyCalculetList } = require("./getMyCalculetList");
const { updateMyCalculet } = require("./updateMyCalculet");
const { deleteMyCalculet } = require("./deleteMyCalculet");
const { public } = require("./getPublicProfile");
// resource
const multer = require("multer");
const upload = multer();
// modules
const { header, body, query, param } = require("express-validator");

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
    auth.signUp,
    errorHandler.asyncWrapper(postProfile),
  ],
  errorHandler.dbWrapper(signUp)
);

/**
 * @swagger
 *  /api/users:
 *    delete:
 *      tags: [users]
 *      summary: 계정 탈퇴 <Auth>
 *      description: 유저가 계정을 탈퇴하는 경우. firebase와 database, s3 bucket에 있는 모든 정보 삭제
 *      responses:
 *        204:
 *          $ref: "#/components/responses/success204"
 */
router.delete("/", auth.validate, errorHandler.dbWrapper(deleteUser.default));

/**
 * @swagger
 *  /api/users/me/profile:
 *    patch:
 *      tags: [users]
 *      summary: 프로필 수정 <Auth>
 *      description: 회원 프로필을 수정함
 *      requestBody:
 *        $ref: "#/components/requestBodies/userUpdateInfo"
 *      responses:
 *        204:
 *          $ref: "#/components/responses/success204"
 *        400:
 *          $ref: "#/components/responses/error"
 *        401:
 *          $ref: "#/components/responses/error"
 */
router.patch(
  "/me/profile",
  [
    upload.single("profileImg"),
    auth.validate,
    errorHandler.asyncWrapper(deleteProfile),
    errorHandler.asyncWrapper(postProfile),
  ],
  errorHandler.dbWrapper(updateUser)
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
router.get("/me/profile", auth.validate, errorHandler.dbWrapper(me.detail));

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
router.get("/me", auth.validate, errorHandler.dbWrapper(me.default));

/**
 * @swagger
 *  /api/users/me/calculet/{calculetId}:
 *    get:
 *      parameters:
 *        - $ref: "#/components/parameters/calculetId"
 *        - $ref: "#/components/parameters/blocked"
 *      tags: [users-calculet]
 *      summary: 로그인 한 사용자(본인)의 특정 마이 계산기 요청 <Auth>
 *      description: 마이 계산기 정보
 *      responses:
 *        200:
 *          $ref: "#/components/responses/myCalculetInfo"
 */
router.get(
  "/me/calculet/:calculetId",
  auth.validate,
  [
    param("calculetId").isUUID(),
    query("blocked").isInt({ gt: -1, lt: 3 }).toInt(),
    inputValidator,
  ],
  errorHandler.dbWrapper(getMyCalculetInfo)
);

/**
 * @swagger
 *  /api/users/me/calculet:
 *    get:
 *      parameters:
 *        - name: blocked
 *          in: query
 *          required: false
 *          description: 계산기 공개 여부 필터
 *          schema:
 *            type: array
 *            style: simple
 *            items:
 *              type: integer
 *        - $ref: "#/components/parameters/size"
 *        - $ref: "#/components/parameters/page"
 *      tags: [users-calculet]
 *      summary: 로그인 한 사용자(본인)의 마이 계산기 목록 요청 <Auth>
 *      description: 마이 계산기 목록들 (임시 계산기 포함)
 *      responses:
 *        200:
 *          $ref: "#/components/responses/myCalculetList"
 */
router.get(
  "/me/calculet",
  auth.validate,
  [
    query("blocked.*").optional().isInt({ gt: -1, lt: 3 }).toInt(),
    query("size").isInt({ gt: 0 }).toInt(),
    query("page").isInt({ gt: 0 }).toInt(),
    inputValidator,
  ],
  errorHandler.dbWrapper(getMyCalculetList)
);

/**
 * @swagger
 *  /api/users/me/calculet:
 *    put:
 *      tags: [users-calculet]
 *      summary: 로그인 한 사용자(본인)의 마이 계산기 수정 요청 <Auth>
 *      description: 마이 계산기 정보 수정하기 & 업데이트 로그 남기기
 *      requestBody:
 *        $ref: "#/components/requestBodies/updateMyCalculetInfo"
 *      responses:
 *        204:
 *          $ref: "#/components/responses/success204"
 */
router.put(
  "/me/calculet",
  [
    auth.validate,
    body("calculetInfo.id").isUUID(),
    body(["calculetInfo.categoryMainId", "calculetInfo.categorySubId"])
      .isInt()
      .toInt(),
    body(["updateMessage", "calculetInfo.title", "calculetInfo.description"])
      .isString()
      .isLength({ min: 1, max: 100 }),
    body("calculetInfo.srcCode").notEmpty(),
    body("calculetInfo.manual").isString(),
    body("calculetInfo.type").isInt({ min: 0, max: 1 }).toInt(),
    body("calculetInfo.blocked").isInt({ min: 0, max: 2 }).toInt(),
    inputValidator,
  ],
  errorHandler.dbWrapper(updateMyCalculet)
);

/**
 * @swagger
 *  /api/users/me/calculet:
 *    delete:
 *      tags: [users-calculet]
 *      summary: 로그인 한 사용자(본인)의 마이 계산기 삭제 요청 <Auth>
 *      description: 마이 계산기 삭제 (임시 계산기 포함)
 *      parameters:
 *      - name: calculetId
 *        in: header
 *        required: true
 *        schema:
 *          $ref: "#/components/schemas/calculetId"
 *      - name: blocked
 *        in: header
 *        required: true
 *        schema:
 *          $ref: "#/components/schemas/calculet/properties/blocked"
 *      responses:
 *        204:
 *          $ref: "#/components/responses/success204"
 */
router.delete(
  "/me/calculet",
  [
    auth.validate,
    header("calculetId").isUUID(),
    header("blocked").isInt({ gt: -1, lt: 3 }).toInt(),
    inputValidator,
  ],
  errorHandler.dbWrapper(deleteMyCalculet)
);

/**
 * @swagger
 *  /api/users/{userId}/profile:
 *    get:
 *      parameters:
 *        - $ref: "#/components/parameters/userId"
 *      tags: [users]
 *      summary: 프로필 정보 가져오는 API (유저 정보) <Auth?>
 *      description: 공개 프로필에 대한 정보
 *      responses:
 *        200:
 *          $ref: "#/components/responses/userPublicInfo"
 *        400:
 *          $ref: "#/components/responses/error"
 */
router.get(
  "/:userId/profile",
  // validate & sanitize query value
  [auth.verify, param("userId").isString(), inputValidator],
  errorHandler.dbWrapper(public.info)
);

/**
 * @swagger
 *  /api/users/{userId}/calculet:
 *    get:
 *      parameters:
 *        - $ref: "#/components/parameters/userId"
 *        - $ref: "#/components/parameters/categoryMainId"
 *        - $ref: "#/components/parameters/categorySubId"
 *        - $ref: "#/components/parameters/size"
 *        - $ref: "#/components/parameters/page"
 *      tags: [users-calculet]
 *      summary: 프로필 정보 가져오는 API (계산기 리스트) - offset pagination <Auth?>
 *      description: 대분류 | 소분류로 검색 필터 설정 가능
 *      responses:
 *        200:
 *          $ref: "#/components/responses/userPublicCalculet"
 *        400:
 *          $ref: "#/components/responses/error"
 */
router.get(
  "/:userId/calculet",
  // validate & sanitize query value
  [
    auth.verify,
    param("userId").isString(),
    query("categoryMainId").optional().isInt().toInt(),
    query("categorySubId").optional().isInt().toInt(),
    query("size").isInt({ gt: 0 }).toInt(),
    query("page").isInt({ gt: 0 }).toInt(),
    inputValidator,
  ],
  errorHandler.dbWrapper(public.calculet)
);

module.exports = router;
