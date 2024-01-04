const { Op } = require("sequelize");
const { models } = require("../../models");
const { userBookmark } = require("./bookmark/userBookmark");
const { userLike } = require("./userLike");
const { CustomError } = require("../../utils/CustomError");

async function getCalculetInfo(req, res) {
  // 계산기 정보 (유저와 카테고리 대분류, 소분류, 계산기 통계, 조회수)
  const calculetInfo = await models.calculetInfo.findOne({
    include: [
      // contributor
      {
        model: models.userInfo,
        required: true,
        attributes: ["id", "userName", "profileImgSrc"],
        as: "contributor",
      },
    ],
    where: {
      id: {
        [Op.eq]: req.params.calculetId,
      },
    },
  });

  if (calculetInfo === null) {
    throw new CustomError(404, 0);
  }

  if (calculetInfo.blocked) {
    throw new CustomError(403, 2);
  }

  // update view count of calculet
  calculetInfo.increment("viewCnt");

  // check if user liked
  const userLiked = res.locals.userId
    ? await userLike.check(res.locals.userId, req.params.calculetId)
    : false;

  // check if user bookmarked
  const userBookmarked = res.locals.userId
    ? await userBookmark.check(res.locals.userId, req.params.calculetId)
    : false;

  const {
    title,
    srcCode,
    manual,
    description,
    categoryMainId,
    categorySubId,
    id,
    createdAt,
    contributor,
    statistics,
    type,
  } = calculetInfo.toJSON();

  const responseData = {
    title,
    srcCode,
    manual,
    description,
    categoryMainId,
    categorySubId,
    id,
    createdAt,
    contributor,
    statistics,
    userCalculet: {
      liked: userLiked,
      bookmarked: userBookmarked,
    },
    isMe: contributor.id === res.locals.userId,
    type,
  };

  res.status(200).send(responseData);
}

module.exports = { getCalculetInfo };
