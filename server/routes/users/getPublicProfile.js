const { models } = require("../../models");
const { Op } = require("sequelize");
const { setFilter, getSearchCalculetList } = require("../calculets/search");

/**
 * 사용자 프로필 가져오는 API
 */
async function getUserInfo(req, res) {
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
