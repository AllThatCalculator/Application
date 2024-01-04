const { models } = require("../../models");

/**
 * 카테고리 목록 반환
 */
async function getCategory(req, res) {
  const CONVERTER = 0;
  const CONVERTER_LABEL = "단위변환기";
  const categoryList = await models.category.findAll({
    include: [
      {
        model: models.categoryMain,
        required: true,
        attributes: ["name"],
        as: "main",
      },
      {
        model: models.categorySub,
        required: true,
        attributes: ["name"],
        as: "sub",
      },
    ],
    order: ["subId", "mainId"],
  });

  const responseData = {};
  responseData[CONVERTER] = {
    name: CONVERTER_LABEL,
  };
  categoryList.map((element) => {
    if (responseData[element.mainId] === undefined) {
      responseData[element.mainId] = {
        name: element.main.name,
      };
      // 단위변환기 모으기
      if (element.subId === CONVERTER) {
        responseData[CONVERTER][element.mainId] = element.main.name;
      }
    }

    responseData[element.mainId][element.subId] = element.sub.name;
  });

  res.send(responseData);
}

module.exports = { getCategory };
