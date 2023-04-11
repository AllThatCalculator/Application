const { models } = require("../../models");
const { sendEmail } = require("../../utils/emailSender");

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

  sendEmail().catch(err, () => console.error);
  res.status(201).send("/");
}

module.exports = { postCalculets };
