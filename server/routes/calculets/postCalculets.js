const { Op } = require("sequelize");
const { models } = require("../../models2");

async function postCalculets(req, res) {
  // 데이터 생성
  await models.calculetInfoTemp.create({
    title: req.body.title,
    srcCode: req.body.srcCode,
    manual: req.body.manual,
    description: req.body.description,
    categoryMainId: req.body.categoryMainId,
    categorySubId: req.body.categorySubId,
    contributor_id: res.locals.userId,
  });

  res.status(201).send("/");
}

module.exports = { postCalculets };
