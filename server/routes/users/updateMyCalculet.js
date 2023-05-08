const { models } = require("../../models");
const { CustomError } = require("../../utils/CustomError");
const { matchedData } = require("express-validator");

async function updateMyCalculet(req, res) {
  const bodyData = matchedData(req, { locations: ["body"] });
  const { calculetInfo, updateMessage } = bodyData;

  const whereOption = {
    where: {
      calculetId: calculetInfo.calculetId,
      contributorId: res.locals.userId,
    },
  };
  const calculet = await models.calculetInfo.findOne({
    where: { id: calculetInfo.calculetId, contributorId: res.locals.userId },
  });
  const calculetTemp = await models.calculetInfoTemp.findOne(whereOption);

  if (calculet === null && calculetTemp === null) {
    throw new CustomError(400, 0);
  }

  // check exist calculet temp data
  if (calculetTemp !== null) {
    // delete temp data & update log (latest)
    await models.calculetInfoTemp.destroy(whereOption);
    const latestUpdateLog = await models.calculetUpdateLog.findOne({
      where: { calculetId: calculetInfo.calculetId },
      order: [["createdAt", "DESC"]],
      limit: 1,
    });
    latestUpdateLog.destroy();
  }

  if (calculet !== null) {
    // create update log
    await models.calculetUpdateLog.create({
      calculetId: calculetInfo.calculetId,
      message: updateMessage,
    });

    // change registered
    calculetInfo.registered = true;
  }

  // create calculet info temp
  calculetInfo.contributorId = res.locals.userId;
  await models.calculetInfoTemp.create(calculetInfo);
  res.status(204).send();
}

module.exports = { updateMyCalculet };
