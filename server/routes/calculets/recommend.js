const { col } = require("sequelize");
const { models } = require("../../models2");

/**
 * 추천 리스트 뽑아주는 함수 - 우선 조회수 가장 높은 계산기 추천
 */
async function recommendation(req, res) {
  function calculetQuery(limit) {
    return models.calculetInfo.findAll({
      attributes: ["id", "title", "description", "contributorId", "viewCnt"],
      limit: limit,
      include: [
        // contributor
        {
          model: models.userInfo,
          attributes: ["userName", "profileImgSrc"],
          as: "contributor",
          required: true,
        },
      ],
      order: [[col("viewCnt"), "DESC"]],
    });
  }
  const calculetList = await calculetQuery(15);

  const response = calculetList.map((calculet) => {
    const { viewCnt, contributorId, ...data } = calculet.toJSON();
    return data;
  });

  res.status(200).send(response);
}

exports.recommendation = recommendation;