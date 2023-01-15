const { models } = require("../../models");

exports.signUp = async (req, res) => {
  const userInfo = JSON.parse(req.body.userInfo);

  await models.userInfo
    .create({
      id: res.locals.userId,
      email: userInfo.email,
      user_name: userInfo.userName,
      bio: userInfo.bio,
      sex: userInfo.sex,
      birthdate: userInfo.birthdate,
      job: userInfo.job,
      profile_img: res.locals.profileUUID,
    })
    .then(() => {
      console.log("successfully signed up");
      res.status(201).send({
        success: true,
        message: "회원가입 완료",
      });
    })
    .catch(() => {
      console.log("error occured during creating user info to DB");
      res.status(400).send({
        success: false,
        code: 3,
        message: "already exists",
      });
    });
};
