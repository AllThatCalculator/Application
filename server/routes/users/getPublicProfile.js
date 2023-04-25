const { models } = require("../../models");
const { Op } = require("sequelize");
const { CustomError } = require("../../utils/CustomError");
const { validationResult } = require("express-validator");
const { setFilter, getSearchCalculetList } = require("../calculets/search");

/**
 * 사용자 프로필 가져오는 API
 */
async function getUserInfo(req, res) {
  const error = validationResult(req);
  // request invalid
  if (!error.isEmpty()) {
    console.log(error.mapped());
    throw new CustomError(400, 1);
  }

  // get user info
  const user = await models.userInfo.findByPk(req.params.userId, {
    attributes: ["userName", "bio", "job", "profileImgSrc"],
  });
  //check user who requests is equal userId
  user.dataValues.isMe = req.params.userId === res.locals.userId;

  res.status(200).send(user);
}

/**
 * 사용자 계산기 가져오는 API - offset 페이지네이션
 */
async function getUserCalculet(req, res) {
  const error = validationResult(req);
  // request invalid
  if (!error.isEmpty()) {
    console.log(error.mapped());
    throw new CustomError(400, 1);
  }

  // set filter
  const filter = setFilter(req.query);

  // set contributor id
  filter.contributorId = {
    [Op.eq]: req.params.userId,
  };

  // get search result
  const responseData = await getSearchCalculetList(req.query, filter);

  res.status(200).send(responseData);
}

exports.public = {
  info: getUserInfo,
  calculet: getUserCalculet,
};
