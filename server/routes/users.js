const express = require("express");
const { signUp } = require("./users/signUp");
const { bufferToImageSrc } = require("../utils/bufferConverter");
const { models } = require("../models");
const sequelize = require("sequelize");
const { auth } = require("../middleware/auth");
const { errorHandler } = require("../middleware/errorHandler");
const router = express.Router();
const { postProfile } = require("./s3Bucket/profile");
const multer = require("multer");
const upload = multer();
/**
 * @swagger
 *  /api/users/:
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
 *        201:
 *          description: 회원 등록 완료
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/postResult"
 *        400:
 *          description: 회원 등록 오류 (failed)
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/errorResult"
 *        401:
 *          description: 인증 오류 (invalid token)
 */
router.post(
  "/",
  [
    upload.single("profileImg"),
    auth.firebase,
    errorHandler.asyncWrapper(postProfile),
  ],
  errorHandler.asyncWrapper(signUp)
);

/**
 * @swagger
 *  /api/users/{id}:
 *    get:
 *      tags: [users]
 *      summary: 특정 유저 정보 조회
 *      description: id와 일치하는 유저 찾아서 정보 조회
 *      parameters:
 *        - in: path
 *          type: string
 *          required: true
 *          name: id
 *          description: 사용자 ID
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

router.get("/:id", async (req, res) => {
  try {
    const userInfo = await models.userInfo.findOne({
      where: {
        id: {
          [sequelize.Op.eq]: req.params.id,
        },
      },
    });

    let user = null;
    if (userInfo) {
      user = {
        id: userInfo.id,
        email: userInfo.email,
        userName: userInfo.user_name,
        profileImgSrc: `/file/profile/${userInfo.profile_img}`,
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
