const sequelize = require("sequelize");
const { models } = require("../../models");
const { bufferToString } = require("../../utils/bufferConverter");
const { urlFormatter } = require("../../utils/urlFormatter");

/**
 * 계산기 조회수 늘리기
 */
function addViewCnt(req, res, next) {
  models.calculetCount.findByPk(req.params.id).then((calculet) => {
    calculet.increment("view_cnt", { by: 1 });
  });
  next();
}

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
        attributes: ["view_cnt", "calculation_cnt", "user_cnt"],
        as: "calculet_count",
      },
    ],
    where: {
      id: {
        [sequelize.Op.eq]: req.params.id,
      },
    },
  });

  if (calculetInfo === null) {
    res.status(404).send();
    return;
  }

  const responseData = {
    id: calculetInfo.id,
    title: calculetInfo.title,
    srcCode: bufferToString(calculetInfo.src_code),
    manual: bufferToString(calculetInfo.manual),
    description: calculetInfo.description,
    mainId: calculetInfo.category_main_id,
    subId: calculetInfo.category_sub_id,
    contributor: {
      userName: calculetInfo.contributor.user_name,
      imgSrc: urlFormatter("profileImg", calculetInfo.contributor.profile_img),
    },
    statistics: {
      bookmark: calculetInfo.calculet_statistic.bookmark_cnt,
      like: calculetInfo.calculet_statistic.like_cnt,
      report: calculetInfo.calculet_statistic.report_cnt,
      view: calculetInfo.calculet_count.view_cnt,
      user: calculetInfo.calculet_count.user_cnt,
      calculation: calculetInfo.calculet_count.calculation_cnt,
    },
  };

  res.status(200).send(responseData);
}

// exports.getCalculetInfo = getCalculetInfo;
module.exports = {
  getCalculetInfo,
  addViewCnt,
};
