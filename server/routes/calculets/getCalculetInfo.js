const { Op } = require("sequelize");
const { models } = require("../../models");
const { userBookmark } = require("./bookmark/userBookmark");
const { userLike } = require("./userLike");

async function getCalculetInfo(req, res) {
  // 계산기 정보 (유저와 카테고리 대분류, 소분류, 계산기 통계, 조회수)
  const calculetInfo = await models.calculetInfo.findOne({
    include: [
      // contributor
      {
        model: models.userInfo,
        required: true,
        attributes: ["userName", "profileImgSrc"],
        as: "contributor",
      }
    ],
    where: {
      id: {
        [Op.eq]: req.params.calculetId,
      },
    },
  });

  if (calculetInfo === null) {
    res.status(404).send();
    return;
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
    statistics
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
  };

  res.status(200).send(responseData);
}

module.exports = { getCalculetInfo };
