const { models } = require("../../models");

exports.updateMyCalculet = async (req, res) => {
  const calculetInfo = req.body.calculetInfo;
  const updateMessage = req.body.updateMessage;

  // update calculet info
  await models.calculetInfo.update(calculetInfo, {
    where: { id: calculetInfo.id },
  });

  // create update log
  await models.calculetUpdateLog.create({
    calculetId: calculetInfo.id,
    message: updateMessage,
  });

  res.status(204).send();
};
