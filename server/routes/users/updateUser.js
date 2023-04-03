const { models } = require("../../models");

exports.updateUser = async (req, res) => {
  console.log("profile update");
  // to read multipart/form-data
  const userInfo = JSON.parse(req.body.userInfo);

  if (res.locals.profileUUID) {
    userInfo.profileImgSrc = res.locals.profileUUID;
  }

  await models.userInfo.update(userInfo, { where: { id: res.locals.userId } });

  res.status(204).send();
};
