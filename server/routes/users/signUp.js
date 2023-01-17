const { models } = require("../../models");

exports.signUp = async (req, res) => {
  const userInfo = JSON.parse(req.body.userInfo);

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

  res.status(301).send({
    url: "/",
  });
};
