const { sequelize, models } = require("../../models");
const { Op, col } = require("sequelize");
const { CustomError } = require("../../utils/CustomError");
const { validationResult } = require("express-validator");

/**
 * set filter for db search
 * @param {object} query from client
 * @returns filter
 */
function setFilter(query) {
  // set category condition
  const filter = {};
  if (query.categoryMainId) {
    filter.categoryMainId = {
      [Op.eq]: query.categoryMainId,
    };
  }

  if (query.categorySubId) {
    filter.categorySubId = {
      [Op.eq]: query.categorySubId,
    };
  }

  // check keyword && target both exist
  if (query.target === undefined || query.keyword === undefined) {
    return filter;
  }

  // set search target
  let target = "";
  switch (query.target) {
    case "title":
      target = "title";
      break;
    case "all":
      target = "title, ";
    case "desc":
      target += "description, manual";
      break;
    default:
  }

  // set keyword
  filter.keyword = sequelize.literal(
    `MATCH(${target}) AGAINST("${query.keyword}" in boolean mode)`
  );

  return filter;
}

async function getSearchCalculetList(query, filter) {
  const { size, page } = query;

  const data = await models.calculetInfo.findAndCountAll({
    attributes: [
      "id",
      "title",
      "description",
      "categoryMainId",
      "categorySubId",
      "viewCnt",
    ],
    include: [
      // contributor
      {
        model: models.userInfo,
        attributes: ["userName", "profileImgSrc"],
        as: "contributor",
      },
    ],
    where: filter,
    limit: size,
    offset: size * (page - 1),
    order: [
      [col("viewCnt"), "DESC"],
      [col("id"), "DESC"],
    ],
  });

  const responseData = {
    calculetList: data.rows.map((calculet) => calculet.toJSON()),
    count: data.count,
  };

  return responseData;
}

/**
 * 계산기 검색 함수
 */
async function searchCalculets(req, res) {
  const error = validationResult(req);
  // request invalid
  if (!error.isEmpty()) {
    console.log(error.mapped());
    throw new CustomError(400, 1);
  }

  // set filter
  const filter = setFilter(req.query);
  const responseData = await getSearchCalculetList(req.query, filter);

  res.status(200).send(responseData);
}
exports.search = searchCalculets;
exports.setFilter = setFilter;
exports.getSearchCalculetList = getSearchCalculetList;
