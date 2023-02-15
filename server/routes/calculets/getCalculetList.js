const { Op } = require("sequelize");
const { models } = require("../../models");
const { urlFormatter } = require("../../utils/urlFormatter");
const PREVIEW_CNT = 6;

function makeSubList(condition) {
  // complete where condition
  const filter = {};
  if (typeof condition.mainId === "number") {
    filter.category_main_id = {
      [Op.eq]: condition.mainId,
    };
  }
  if (typeof condition.subId === "number") {
    filter.category_sub_id = {
      [Op.eq]: condition.subId,
    };
  }
  if (typeof condition.title === "string") {
    filter.title = {
      [Op.substring]: condition.title,
    };
  }

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
        },
      ],
      where: filter,
      limit: condition.limit,
      order: [
        [
          { model: models.calculetCount, as: "calculet_count" },
          "view_cnt",
          "DESC",
        ],
      ],
    })
    .then((data) => {
      const subList = data.map((calculet) => ({
        id: calculet.id,
        title: calculet.title,
        description: calculet.description,
        categoryMainId: calculet.category_main_id,
        categorySubId: calculet.category_sub_id,
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
      calculetLists[element.main_id][element.sub_id] = await makeSubList({
        mainId: element.main_id,
        subId: element.sub_id,
        limit: PREVIEW_CNT,
      });
    })
  );

  res.status(200).send(calculetLists);
}

async function getConverters(req, res) {
  // 카테고리 소분류 리스트 얻어오기
  const categorySub = await models.categorySub.findAll({
    order: [["main_id", "ASC"]],
    where: {
      sub_id: {
        [Op.eq]: 0,
      },
    },
  });

  const calculetLists = {};
  await Promise.all(
    categorySub.map(async (element) => {
      calculetLists[element.main_id] = await makeSubList({
        mainId: element.main_id,
        subId: element.sub_id,
        limit: PREVIEW_CNT,
      });
    })
  );
  res.status(200).send(calculetLists);
}

/**
 * 추천 리스트 뽑아주는 함수 - 우선 조회수 가장 높은 계산기 추천
 */
async function recommendation(req, res) {
  const calculetList = await makeSubList({ limit: 15 });

  const response = calculetList.map((calculet) => ({
    id: calculet.id,
    title: calculet.title,
    description: calculet.description,
    contributor: calculet.contributor,
  }));

  res.status(200).send(response);
}

/**
 * 계산기 검색 함수 ( 대분류 | 소분류 | 제목 )
 */
async function searchCalculets(req, res) {
  // set keyword from query string
  const condition = {
    mainId: req.query.categoryMainId
      ? parseInt(req.query.categoryMainId)
      : null,
    subId: req.query.categorySubId ? parseInt(req.query.categorySubId) : null,
    title: req.query.title,
    limit: req.query.limit ? parseInt(req.query.limit) : null,
  };
  const calculetList = await makeSubList(condition);

  res.status(200).send(calculetList);
}

exports.getCalculetList = {
  default: getCalculetList,
  converters: getConverters,
  recommendation: recommendation,
  search: searchCalculets,
};
