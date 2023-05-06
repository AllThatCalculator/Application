const { models } = require("../../models");
const { CustomError } = require("../../utils/CustomError");
const { matchedData } = require("express-validator");

// check calculet's contributor id equals login user id
function checkMyCalculet(calculet, res) {
  if (calculet.contributorId !== res.locals.userId) {
    throw new CustomError(403, 0);
  }
}

async function updateMyCalculet(req, res) {
  const bodyData = matchedData(req, { locations: ["body"] });
  const { calculetInfo, updateMessage } = bodyData;

  const whereOption = { where: { calculetId: calculetInfo.calculetId } };
  const calculet = await models.calculetInfo.findByPk(calculetInfo.calculetId);
  const calculetTemp = await models.calculetInfoTemp.findOne(whereOption);

  if (calculet === null && calculetTemp === null) {
    throw new CustomError(400, 0);
  }

  // check exist calculet temp data
  if (calculetTemp !== null) {
    // check my calculet
    checkMyCalculet(calculetTemp, res);

    // delete temp data & update log
    await models.calculetInfoTemp.destroy(whereOption);
    await models.calculetUpdateLog.destroy(whereOption);
  }

  if (calculet !== null) {
    // check my calculet
    checkMyCalculet(calculet, res);

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
