const express = require("express");
const { signUp } = require("./users/signUp");
const { bufferToImageSrc } = require("../utils/bufferConverter");
const { models } = require("../models");
const sequelize = require("sequelize");

const router = express.Router();

/**
 * 회원 가입
 */
router.post("/", signUp);

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
      // 사용자 이미지를 base64string 으로 변환 + src 생성
      const profileImgSrc = bufferToImageSrc(userInfo.profile_img);

      user = {
        id: userInfo.id,
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
