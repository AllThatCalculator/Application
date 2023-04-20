const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { models } = require("../../models");

async function getUpdateLog(req, res) {
  const updateLog = await models.calculetUpdateLog.findAll({
    where: {
      calculetId: {
        [Op.eq]: req.params.calculetId,
      },
      createdAt: {
        [Op.lte]: sequelize.literal(
          `(SELECT updated_at FROM calculet_info WHERE id = "${req.params.calculetId}")`
        ),
      },
    },
    attributes: ["createdAt", "message"],
    order: [["createdAt", "ASC"]],
  });

  const responseData = updateLog.map((element) => element.toJSON());

  res.status(200).send(responseData);
}

module.exports = { getUpdateLog };
