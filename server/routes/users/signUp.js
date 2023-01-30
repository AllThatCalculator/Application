const { models } = require("../../models");
const { errorObject } = require("../../utils/errorMessage");

exports.signUp = async (req, res) => {
  // to read multipart/form-data
  const userInfo = JSON.parse(req.body.userInfo);

  if ((await models.userInfo.findByPk(res.locals.userId)) !== null) {
    // already signed up
    res.status(409).send(errorObject(409, 0));
    return;
  }

  await models.userInfo.create({
    id: res.locals.userId,
    email: res.locals.email,
    user_name: userInfo.userName,
    bio: userInfo.bio,
    sex: userInfo.sex,
    birthdate: userInfo.birthdate,
    job: userInfo.job,
    profile_img: res.locals.profileUUID,
  });

  console.log("successfully signed up");

  res.status(201).send("/");
};
