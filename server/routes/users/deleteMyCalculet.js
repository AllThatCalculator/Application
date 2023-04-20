const { models } = require("../../models");
const { Op } = require("sequelize");

exports.deleteMyCalculet = async (req, res) => {
  const blocked = req.get("blocked");
  const calculetId = req.get("calculetId");

  // if blocked == 0, delete calculet info
  if (blocked == 0) {
    await models.calculetInfo.destroy({
      where: {
        id: {
          [Op.eq]: calculetId,
        },
        contributorId: {
          [Op.eq]: res.locals.userId,
        },
      },
    });
  }
  // if blocked == 2, delete calculet info temp
  if (blocked == 2) {
    await models.calculetInfoTemp.destroy({
      where: {
        id: {
          [Op.eq]: calculetId,
        },
        contributorId: {
          [Op.eq]: res.locals.userId,
        },
      },
    });
  }

  res.status(204).send();
};
