const { models } = require("../../models");
const sequelize = require("sequelize");
const { errorObject } = require("../../utils/errorMessage");
/**
 * 유저 프로필(헤더 디스플레이 - userName, profileImg) 찾는 함수
 */
async function getUserSimpleInfo(req, res) {
  // get user info
  const user = await models.userInfo.findOne({
    attribuites: ["user_name", "profile_img"],
    where: {
      id: {
        [sequelize.Op.eq]: res.locals.userId,
      },
    },
  });

  // DB에 없는 유저인 경우
  if (user === null) {
    res.status(401).send(errorObject(401, 2));
    return;
  }

  // 데이터 가공
  const userInfo = {
    userName: user.user_name,
    profileImgSrc: `/file/profile/${user.profile_img}`,
  };

  res.status(200).send(userInfo);
  return;
}

/**
 * 유저 프로필 정보 찾는 함수
 */
async function getUserInfo(req, res) {
  // get user info
  const user = await models.userInfo.findOne({
    where: {
      id: {
        [sequelize.Op.eq]: res.locals.userId,
      },
    },
  });

  // DB에 없는 유저인 경우
  if (user === null) {
    res.status(401).send(errorObject(401, 2));
    return;
  }
  console.log(user);

  // 데이터 가공
  const userInfo = {
    userName: user.user_name,
    bio: user.bio,
    sex: user.sex,
    birthdate: user.birthdate,
    job: user.job,
    profileImgSrc: `/file/profile/${user.profile_img}`,
    email: user.email,
  };

  res.status(200).send(userInfo);
  return;
}

exports.me = {
  default: getUserSimpleInfo,
  profile: getUserInfo,
};
