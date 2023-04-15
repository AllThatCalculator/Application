const { models } = require("../../models");
const { Op } = require("sequelize");
const { formatCode } = require("../utils/formatCode");

async function getShowCode(req, res) {
  // 임시 테이블 접근해서 계산기 소스코드 가져오기
  const calculetInfoTemp = await models.calculetInfoTemp.findOne({
    attributes: ["srcCode"],
    where: {
      id: {
        [Op.eq]: req.params.calculetId,
      },
    },
  });

  if (calculetInfoTemp === null) {
    res.status(404).send();
    return;
  }

  res.status(200).send(formatCode(calculetInfoTemp.srcCode));
}

module.exports = { getShowCode };
