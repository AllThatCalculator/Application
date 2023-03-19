const { Op, col } = require("sequelize");
const { models } = require("../../models");
const PREVIEW_CNT = 6;

/**
 * DB 검색한 데이터 후가공
 * @param {object} calculet DB 검색 결과 데이터
 * @param {number} categoryMainId 대분류 ID
 * @param {number} categorySubId 소분류 ID
 * @returns 가공된 데이터
 */
function processCalculet(calculet, categoryMainId, categorySubId) {
  return {
    id: calculet.id,
    title: calculet.title,
    description: calculet.description,
    categoryMainId,
    categorySubId,
    viewCnt: calculet.calculet_count.view_cnt,
    contributor: {
      userName: calculet.contributor.user_name,
      profileImgSrc: calculet.contributor.profile_img,
    },
  };
}

/**
 * 소분류 별로 최대 PREVIEW_CNT개의 계산기 미리보기 정보를 DB에서 검색함
 * @param {number} categoryId 
 * @returns 검색된 계산기 미리보기 정보 배열
 */
function getCalculetsByCategoryId(categoryId) {
  return models.calculetInfo.findAll({
    attributes: ["id", "title", "description", "category_id",],
    where: {
      category_id: categoryId
    },
    limit: PREVIEW_CNT,
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

function searchCalculetQuery(condition) {
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
          attributes: ["user_name", "profile_img"],
          as: "contributor",
        },
        // count
        {
          model: models.calculetCount,
          attributes: ["view_cnt"],
          as: "calculet_count",
        },
        // category
        {
          model: models.category,
          as: "category",
          where: categoryFilter,
          attributes: ["main_id", "sub_id"]
        }
      ],
      where: filter,
      limit: condition.limit,
      order: [[col("view_cnt"), "DESC"]],
    });
}

/**
 * 각 대분류/소분류 별 계산기 목록
 */
async function getCalculetList(req, res) {
  // 카테고리 소분류 리스트 얻어오기
  const categoryList = await models.category.findAll({
    order: [
      ["main_id", "ASC"],
      ["sub_id", "ASC"],
    ],
  });

  const response = {};

  await Promise.all(
    categoryList.map(async (category) => {
      const { id, main_id, sub_id } = category;
      if (response[main_id] === undefined) {
        response[main_id] = {};
      }
      const calculetList = await getCalculetsByCategoryId(id);
      response[main_id][sub_id] = calculetList.map((calculet) => processCalculet(calculet, main_id, sub_id));
    })
  );

  res.status(200).send(response);
}

/**
 * 각 대분류 별 단위변환기 목록
 */
async function getConverters(req, res) {
  // list all converter category
  const categoryList = await models.category.findAll({
    where: {
      sub_id: 0
    }
  });

  const response = {};

  await Promise.all(
    categoryList.map(async (category) => {
      const calculetList = await getCalculetsByCategoryId(category.id);
      response[category.main_id] = calculetList.map((calculet) => processCalculet(calculet, category.main_id, category.sub_id));
    })
  );

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
  const responseData = {};
  const calculetList = await searchCalculetQuery(condition);
  responseData.calculetList = calculetList.map((calculet) => processCalculet(calculet, calculet.category.main_id, calculet.category.sub_id));
  responseData.count = calculetList.length;

  res.status(200).send(responseData);
}

exports.getCalculetList = {
  default: getCalculetList,
  converters: getConverters,
  search: searchCalculets,
};
