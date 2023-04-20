const { models } = require("../../models");
const { Op } = require("sequelize");
const { CustomError } = require("../../utils/CustomError");
const { validationResult, matchedData } = require("express-validator");

exports.updateMyCalculet = async (req, res) => {
  const error = validationResult(req);
  // request invalid
  if (!error.isEmpty()) {
    console.log(error.mapped());
    throw new CustomError(400, 1);
  }

  const bodyData = matchedData(req, { locations: ["body"] });
  const calculetInfo = bodyData.calculetInfo;
  const updateMessage = bodyData.updateMessage;

  // check my calculet
  const user = await models.calculetInfo.findByPk(calculetInfo.id);
  if (user.contributorId != res.locals.userId) {
    throw new CustomError(403, 0);
  }

  // create calculet info temp
  calculetInfo.contributorId = res.locals.userId;
  calculetInfo.registered = true;
  await models.calculetInfoTemp.create(calculetInfo);

  // create update log
  await models.calculetUpdateLog.create({
    calculetId: calculetInfo.id,
    message: updateMessage,
  });
  res.status(204).send();
};
