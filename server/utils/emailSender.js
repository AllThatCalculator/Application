const nodemailer = require("nodemailer");
const { models } = require("../models");
const { emailTemplate } = require("./email/template");
const { adminContent } = require("./email/adminContent");
const { shortcutButton } = require("./email/shortcutButton");
const { userContent } = require("./email/userContent");

/**
 * level 2 이상인 관리자 메일 목록 반환
 * @returns email list of admin user (level >= 2)
 */
function getAdminEmailList() {
  return models.admin
    .findAll()
    .then((list) =>
      list
        .filter((user) => user.accessLevel >= 2)
        .map((user) => user.toJSON().email)
    );
}

/**
 * 관리자에게 가는 계산기 임시 등록 알림 메일
 * @param {object} calculetObj 계산기 객체
 * @returns
 */
async function alertMailForAdmin(calculetObj) {
  const { id, title, categoryMainId, categorySubId, description, manual } =
    calculetObj;

  const [categoryMain, categorySub, adminList] = await Promise.all([
    models.categoryMain
      .findByPk(categoryMainId, { attributes: ["name"] })
      .then((data) => data.name),
    models.categorySub
      .findByPk(categorySubId, { attributes: ["name"] })
      .then((data) => data.name),
    getAdminEmailList(),
  ]);

  const html = emailTemplate(
    adminContent(
      title,
      categoryMain,
      categorySub,
      description,
      manual,
      shortcutButton(
        `https://dev.allthatcalculator.io/admin/resources/calculet_info_temp/records/${id}/show`
      )
    )
  );

  return sendEmail({
    to: adminList,
    subject: `[AllThatCalculator] 새로운 계산기 "${title}" 등록 확인 요청`,
    html,
  });
}

/**
 * 유저에게 가는 계산기 등록 알림 메일
 * @param {string} calculetId 계산기 id
 * @param {string} title 계산기 제목
 * @param {string} contributorId 유저 uid
 * @returns
 */
async function alertMailForUser(calculetId, title, contributorId) {
  const { userName, email } = await models.userInfo.findByPk(contributorId, {
    attributes: ["userName", "email"],
  });

  const html = emailTemplate(
    userContent(
      title,
      userName,
      shortcutButton(`https://allthatcalculator.io/${calculetId}`)
    )
  );

  return sendEmail({
    to: email,
    subject: `[AllThatCalculator] "${title}"이(가) 등록되었습니다!`,
    html,
  });
}

/**
 * nodemailer로 이메일 보내는 함수
 * @param {object} mailObject 이메일 내용
 * @param {Array<string>} mailObject.to 수신자 메일 배열
 * @param {string} mailObject.subject 제목
 * @param {string} mailObject.html 본문
 */
async function sendEmail(mailObject) {
  // fixed part
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // send mail
  const info = await transporter.sendMail({
    ...mailObject,
    from: process.env.EMAIL_ACCOUNT, // sender address
  });

  console.log("Message sent: %s", info.messageId);
}

exports.sendEmail = {
  admin: alertMailForAdmin,
  user: alertMailForUser,
};
