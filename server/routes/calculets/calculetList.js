const { Op } = require("sequelize");
const { models } = require("../../models");
const { urlFormatter } = require("../../utils/urlFormatter");

function makeSubList(mainId, subId) {
  const PREVIEW_CNT = 6;

  return models.calculetInfo
    .findAll({
      attributes: [
        "id",
        "title",
        "description",
        "category_main_id",
        "category_sub_id",
      ],
      include: [
        // contributor
        {
          model: models.userInfo,
          required: true,
          attributes: ["user_name", "profile_img"],
          as: "contributor",
        },
        // count
        {
          model: models.calculetCount,
          required: true,
          attributes: ["view_cnt"],
          as: "calculet_count",
          order: [["view_cnt", "DESC"]],
        },
      ],
      where: {
        category_main_id: {
          [Op.eq]: mainId,
        },
        category_sub_id: {
          [Op.eq]: subId,
        },
      },
      limit: PREVIEW_CNT,
    })
    .then((data) => {
      const subList = data.map((calculet) => ({
        id: calculet.id,
        title: calculet.title,
        description: calculet.description,
        categoryMainId: mainId,
        categorySubId: subId,
        viewCnt: calculet.calculet_count.view_cnt,
        contributor: {
          userName: calculet.contributor.user_name,
          profileImgSrc: urlFormatter(
            "profileImg",
            calculet.contributor.profile_img
          ),
        },
      }));
      return subList;
    });
}

async function getCalculetList(req, res) {
  // 카테고리 소분류 리스트 얻어오기
  const categorySub = await models.categorySub.findAll({
    order: [
      ["main_id", "ASC"],
      ["sub_id", "ASC"],
    ],
  });
  const calculetLists = {};

  // ordinary
  await Promise.all(
    categorySub.map(async (element) => {
      if (calculetLists[element.main_id] === undefined) {
        calculetLists[element.main_id] = {};
      }
      calculetLists[element.main_id][element.sub_id] = await makeSubList(
        element.main_id,
        element.sub_id
      );
    })
  );

  res.status(200).send(calculetLists);
}

module.exports = { getCalculetList };
