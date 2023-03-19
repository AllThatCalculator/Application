const { col } = require("sequelize");
const { models } = require("../../models");

/**
 * 추천 리스트 뽑아주는 함수 - 우선 조회수 가장 높은 계산기 추천
 */
async function recommendation(req, res) {
  function calculetQuery(limit) {
    return models.calculetInfo.findAll({
      limit: limit,
      include: [
        // contributor
        {
          model: models.userInfo,
          attributes: ["user_name", "profile_img"],
          as: "contributor",
          required: true,
        },
        // count
        {
          model: models.calculetCount,
          attributes: ["view_cnt"],
          as: "calculet_count",
          required: true,
        },
      ],
      order: [[col("view_cnt"), "DESC"]],
    });
  }
  const calculetList = await calculetQuery(15);

  const response = calculetList.map((calculet) => ({
    id: calculet.id,
    title: calculet.title,
    description: calculet.description,
    contributor: {
      userName: calculet.contributor.user_name,
      profileImgSrc: calculet.contributor.profile_img,
    }
  }));

  res.status(200).send(response);
}

exports.recommendation = recommendation;