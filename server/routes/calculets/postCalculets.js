const { models } = require("../../models");
const { v4: uuidv4 } = require("uuid");

async function postCalculets(req, res) {
  const newCalculetObject = {
    id: uuidv4(),
    title: req.body.title,
    srcCode: req.body.srcCode,
    manual: req.body.manual,
    description: req.body.description,
    categoryMainId: req.body.categoryMainId,
    categorySubId: req.body.categorySubId,
    contributorId: res.locals.userId,
  };

  // create data
  await models.calculetInfoTemp.create(newCalculetObject);

  // send mail to admin
  if (process.env.NODE_ENV === "production") {
    const { sendEmail, mailFormat } = require("../../utils/emailSender");
    mailFormat.admin(newCalculetObject)
      .then((mailContent) => sendEmail(mailContent))
      .catch(console.error);
  }

  res.status(201).send("/");
}

module.exports = { postCalculets };
