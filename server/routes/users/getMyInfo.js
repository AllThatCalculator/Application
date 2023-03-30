const { models } = require("../../models2");

/**
 * 유저 프로필(헤더 디스플레이 - userName, profileImg) 찾는 함수
 */
async function getUserSimpleInfo(req, res) {
  const user = await models.userInfo.findByPk(res.locals.userId, {
    attributes: ["userName", "profileImgSrc"]
  });

  res.status(200).send(user.toJSON());
  return;
}

/**
 * 유저 프로필 정보 찾는 함수
 */
async function getUserInfo(req, res) {
  const user = await models.userInfo.findByPk(res.locals.userId, {
    attributes: {
      exclude: ["id", "createdAt", "updatedAt"]
    }
  });

  res.status(200).send(user.toJSON());
  return;
}

exports.me = {
  default: getUserSimpleInfo,
  detail: getUserInfo,
};
