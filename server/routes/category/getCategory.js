const { models } = require("../../models");

/**
 * 카테고리 목록 반환
 */
async function getCategory(req, res) {
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
  });

  const responseData = {};
  categoryList.map((element) => {
    if (responseData[element.mainId] === undefined) {
      responseData[element.mainId] = {
        name: element.main.name,
      };
    }

    responseData[element.mainId][element.subId] = element.sub.name;
  });

  res.send(responseData);
}

module.exports = { getCategory };
