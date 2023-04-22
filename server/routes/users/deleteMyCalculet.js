const { models } = require("../../models");
const { Op } = require("sequelize");
const { CustomError } = require("../../utils/CustomError");
const { validationResult } = require("express-validator");

exports.deleteMyCalculet = async (req, res) => {
  const error = validationResult(req);
  // request invalid
  if (!error.isEmpty()) {
    console.log(error.mapped());
    throw new CustomError(400, 1);
  }

  const blocked = req.get("blocked");
  const calculetId = req.get("calculetId");
  const option = {
    where: {
      id: {
        [Op.eq]: calculetId,
      },
      contributorId: {
        [Op.eq]: res.locals.userId,
      },
    },
  };

  let result = 0;
  if (blocked === 2) {
    // if blocked === 2, delete calculet info temp
    result = await models.calculetInfoTemp.destroy(option);
  } else {
    // if blocked === 0 or 1, delete calculet info
    result = await models.calculetInfo.destroy(option);
  }

  // if not exist calculet
  if (result == 0) {
    console.log("Verify that blocked field or calculetId is given correctly");
    throw new CustomError(404, 0);
  }
  res.status(204).send();
};
