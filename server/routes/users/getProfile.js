const { models } = require("../../models");
const { Op, col } = require("sequelize");
const { CustomError } = require("../../utils/CustomError");
const { validationResult } = require("express-validator");

/**
 * set filter for db search
 * @param {object} query from client
 * @returns filter
 */
function setFilter(query) {
  const filter = {};
  // set contributor id
  filter.contributorId = {
    [Op.eq]: query.contributorId,
  };

  // set category condition
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
  return filter;
}

/**
 * 사용자 프로필 + 계산기 리스트 가져오는 API
 */
async function getProfile(req, res) {
  const error = validationResult(req);
  // request invalid
  if (!error.isEmpty()) {
    console.log(error.mapped());
    throw new CustomError(400, 1);
  }

  // get user info
  const user = await models.userInfo.findByPk(req.query.contributorId, {
    attributes: ["userName", "bio", "job", "profileImgSrc"],
  });

  console.log(user);

  // set filter
  const filter = setFilter(req.query);
  const { size, page } = req.query;

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
    user: user,
    calculetList: data.rows.map((calculet) => calculet.toJSON()),
    count: data.count,
    isMe: req.query.contributorId === res.locals.userId,
  };
  res.status(200).send(responseData);
}

module.exports = { getProfile };
