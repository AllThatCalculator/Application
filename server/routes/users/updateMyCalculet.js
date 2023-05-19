const { models } = require("../../models");
const { CustomError } = require("../../utils/CustomError");
const { matchedData } = require("express-validator");

async function updateMyCalculet(req, res) {
  const bodyData = matchedData(req, { locations: ["body"] });
  const { calculetInfo, updateMessage } = bodyData;

  const whereOption = {
    where: {
      id: calculetInfo.id,
      contributorId: res.locals.userId,
    },
  };

  let calculet = null;
  let calculetTemp = null;
  let calculetId = calculetInfo.id;
  if (calculetInfo.blocked === 2) {
    calculetTemp = await models.calculetInfoTemp.findOne(whereOption);
  } else {
    // check exist calculet temp (because if exist calculet temp, then should modify temp table, not info)
    const temp = await models.calculetInfoTemp.findOne({
      where: {
        calculetId: calculetId,
        contributorId: res.locals.userId,
      },
    });
    if (temp) {
      throw new CustomError(400, 1);
    }
    calculet = await models.calculetInfo.findOne(whereOption);
  }

  if (calculet === null && calculetTemp === null) {
    throw new CustomError(400, 0);
  }

  // check exist calculet temp data
  if (calculetTemp !== null) {
    calculetId = calculetTemp.calculetId;

    // delete temp data
    await models.calculetInfoTemp.destroy(whereOption);

    // if registered is true, then delete update log (latest)
    if (calculetTemp.registered) {
      const latestUpdateLog = await models.calculetUpdateLog.findOne({
        where: { calculetId: calculetId },
        order: [["createdAt", "DESC"]],
        limit: 1,
      });
      latestUpdateLog.destroy();
    }
  }

  if (calculet !== null || (calculetTemp !== null && calculetTemp.registered)) {
    // create update log
    await models.calculetUpdateLog.create({
      calculetId: calculetId,
      message: updateMessage,
    });

    // change registered
    calculetInfo.registered = true;
  }

  // create calculet info temp
  delete calculetInfo.id;
  calculetInfo.calculetId = calculetId;
  calculetInfo.contributorId = res.locals.userId;
  await models.calculetInfoTemp.create(calculetInfo);
  res.status(204).send();
}

module.exports = { updateMyCalculet };
