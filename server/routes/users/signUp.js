const { admin } = require("../../config/firebase");
const { models } = require("../../models");
const { CustomError } = require("../../utils/CustomError");
const { timestamp } = require("../../utils/timestamp");

exports.signUp = async (req, res) => {
  // to read multipart/form-data
  const userInfo = JSON.parse(req.body.userInfo);

  if ((await models.userInfo.findByPk(res.locals.userId)) !== null) {
    // already signed up
    throw new CustomError(409, 0);
  }

  await models.userInfo.create({
    id: res.locals.userId,
    email: res.locals.email,
    userName: userInfo.userName,
    bio: userInfo.bio,
    sex: userInfo.sex,
    birthdate: userInfo.birthdate,
    job: userInfo.job,
    profileImgSrc: res.locals.profileUUID,
  });

  await admin.auth().setCustomUserClaims(res.locals.userId, {
    registered: true,
  });

  console.log(
    `${timestamp()} | USER ${res.locals.userId} successfully signed up`
  );

  res.status(201).send("/");
};
