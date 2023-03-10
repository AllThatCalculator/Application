const { Op } = require("sequelize");
const { models } = require("../../models");
const { urlFormatter } = require("../../utils/urlFormatter");
const PREVIEW_CNT = 6;

function getCalculetsFromDB(condition = {}) {
  // complete where condition
  const filter = {};
  if (typeof condition.title === "string") {
    filter.title = {
      [Op.substring]: condition.title,
    };
  }

  const categoryFilter = {};
  if (typeof condition.mainId === "number") {
    categoryFilter.main_id = {
      [Op.eq]: condition.mainId,
    };
  }
  if (typeof condition.subId === "number") {
    categoryFilter.sub_id = {
      [Op.eq]: condition.subId,
    };
  }

  return models.calculetInfo
    .findAll({
      attributes: [
        "id",
        "title",
        "description",
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
        // category
        {
          model: models.category,
          required: true,
          as: "category",
          where: categoryFilter,
        }
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
        categoryMainId: calculet.category.main_id,
        categorySubId: calculet.category.sub_id,
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
  const categoryList = await models.category.findAll({
    order: [
      ["main_id", "ASC"],
      ["sub_id", "ASC"],
    ],
  });

  const calculetLists = await getCalculetsFromDB({ limit: PREVIEW_CNT });

  const response = {};
  categoryList.map((category) => {
    if (response[category.main_id] === undefined) {
      response[category.main_id] = {};
    }
    response[category.main_id][category.sub_id] = [];
  });

  calculetLists.map((calculet) => {
    response[calculet.categoryMainId][calculet.categorySubId].push(calculet);
  });

  res.status(200).send(response);
}

async function getConverters(req, res) {
  const calculetLists = await getCalculetsFromDB({
    subId: 0,
    limit: PREVIEW_CNT,
  });

  const response = {};

  calculetLists.map((calculet) => {
    if (response[calculet.categoryMainId] === undefined) {
      response[calculet.categoryMainId] = [];
    }
    response[calculet.categoryMainId].push(calculet);
  });

  res.status(200).send(response);
}

/**
 * 추천 리스트 뽑아주는 함수 - 우선 조회수 가장 높은 계산기 추천
 */
async function recommendation(req, res) {
  const calculetList = await getCalculetsFromDB({ limit: 15 });

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
  const calculetList = await getCalculetsFromDB(condition);

  res.status(200).send(calculetList);
}

exports.getCalculetList = {
  default: getCalculetList,
  converters: getConverters,
  recommendation: recommendation,
  search: searchCalculets,
};
