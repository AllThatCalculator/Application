const { models } = require("../../models");
const { v4: uuidv4 } = require("uuid");

async function postCalculets(req, res) {
  console.log(req.body);

  const newCalculetObject = {
    id: uuidv4(),
    title: req.body.title,
    srcCode: req.body.srcCode,
    manual: req.body.manual,
    description: req.body.description,
    categoryMainId: req.body.categoryMainId,
    categorySubId: req.body.categorySubId,
    contributorId: res.locals.userId,
    type: req.body.type || 0,
  };

  // create data
  await models.calculetInfoTemp.create(newCalculetObject);

  // send mail to admin
  if (process.env.NODE_ENV === "production") {
    const { sendEmail } = require("../../utils/emailSender");
    sendEmail.admin(newCalculetObject).catch(console.error);
  }

  res.status(201).send("/");
}

module.exports = { postCalculets };
