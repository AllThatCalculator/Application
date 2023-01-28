const { Op } = require("sequelize");
const { models } = require("../../models");

async function getUpdateLog(req, res) {
  const updateLog = await models.calculetUpdateLog.findAll({
    where: {
      calculet_id: {
        [Op.eq]: req.params.calculetId,
      },
    },
    attributes: ["created_at", "message"],
    order: [["created_at", "ASC"]],
  });

  const responseData = updateLog.map((element) => ({
    createdAt: element.created_at,
    message: element.message,
  }));

  res.status(200).send(responseData);
}

module.exports = { getUpdateLog };
