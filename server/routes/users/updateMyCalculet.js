const { models } = require("../../models");
const { Op } = require("sequelize");

exports.updateMyCalculet = async (req, res) => {
  const calculetInfo = req.body.calculetInfo;
  const updateMessage = req.body.updateMessage;

  const user = await models.calculetInfo.findByPk(calculetInfo.id, {
    attributes: ["contributorId"],
  });

  console.log(res.locals.userId);
  console.log(user.contributorId);
  if (user.contributorId != res.locals.userId) {
    res.status(400).send("user mismatch");
  }

  // create calculet info temp
  calculetInfo.contributorId = res.locals.userId;
  await models.calculetInfoTemp.create(calculetInfo);

  // create update log
  await models.calculetUpdateLog.create({
    calculetId: calculetInfo.id,
    message: updateMessage,
  });

  // delete calculet info
  await models.calculetInfo.destroy({
    where: {
      id: {
        [Op.eq]: calculetInfo.id,
      },
    },
  });

  res.status(204).send();
};
