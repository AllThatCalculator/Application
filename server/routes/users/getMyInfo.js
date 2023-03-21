const { models } = require("../../models");

/**
 * 유저 프로필(헤더 디스플레이 - userName, profileImg) 찾는 함수
 */
async function getUserSimpleInfo(req, res) {
  const user = await models.userInfo.findByPk(res.locals.userId, {
    attributes: ["user_name", "profile_img"]
  });

  // 데이터 가공
  const userInfo = {
    userName: user.user_name,
    profileImgSrc: user.profile_img,
  };

  res.status(200).send(userInfo);
  return;
}

/**
 * 유저 프로필 정보 찾는 함수
 */
async function getUserInfo(req, res) {
  const user = await models.userInfo.findByPk(res.locals.userId);

  // 데이터 가공
  const userInfo = {
    userName: user.user_name,
    bio: user.bio,
    sex: user.sex,
    birthdate: user.birthdate,
    job: user.job,
    profileImgSrc: user.profile_img,
    email: user.email,
  };

  res.status(200).send(userInfo);
  return;
}

exports.me = {
  default: getUserSimpleInfo,
  detail: getUserInfo,
};
