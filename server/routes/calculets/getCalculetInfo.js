const { Op } = require("sequelize");
const { models } = require("../../models");
const { bufferToString } = require("../../utils/bufferConverter");
const { urlFormatter } = require("../../utils/urlFormatter");
const { userBookmark } = require("./userBookmark");
const { userLike } = require("./userLike");

async function getCalculetInfo(req, res) {
  // 계산기 정보 (유저와 카테고리 대분류, 소분류, 계산기 통계, 조회수)
  const calculetInfo = await models.calculetInfo.findOne({
    include: [
      // contributor
      {
        model: models.userInfo,
        required: true,
        attributes: ["user_name", "profile_img"],
        as: "contributor",
      },
      // statistics
      {
        model: models.calculetStatistics,
        required: true,
        attributes: ["bookmark_cnt", "like_cnt", "report_cnt"],
        as: "calculet_statistic",
      },
      // count
      {
        model: models.calculetCount,
        required: true,
        attributes: ["view_cnt", "calculation_cnt", "user_cnt", "calculet_id"],
        as: "calculet_count",
      },
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
  calculetInfo.calculet_count.increment("view_cnt");

  // check if user liked
  const userLiked = res.locals.userId
    ? await userLike.check(res.locals.userId, req.params.calculetId)
    : false;

  // check if user bookmarked
  const userBookmarked = res.locals.userId
    ? await userBookmark.check(res.locals.userId, req.params.calculetId)
    : false;

  const responseData = {
    id: calculetInfo.id,
    title: calculetInfo.title,
    srcCode: bufferToString(calculetInfo.src_code),
    manual: bufferToString(calculetInfo.manual),
    description: calculetInfo.description,
    categoryMainId: calculetInfo.category_main_id,
    categorySubId: calculetInfo.category_sub_id,
    contributor: {
      userName: calculetInfo.contributor.user_name,
      profileImgSrc: urlFormatter(
        "profileImg",
        calculetInfo.contributor.profile_img
      ),
    },
    statistics: {
      bookmark: calculetInfo.calculet_statistic.bookmark_cnt,
      like: calculetInfo.calculet_statistic.like_cnt,
      report: calculetInfo.calculet_statistic.report_cnt,
      view: calculetInfo.calculet_count.view_cnt,
      user: calculetInfo.calculet_count.user_cnt,
      calculation: calculetInfo.calculet_count.calculation_cnt,
    },
    userCalculet: {
      liked: userLiked,
      bookmarked: userBookmarked,
    },
  };

  res.status(200).send(responseData);
}

module.exports = { getCalculetInfo };
