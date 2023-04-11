const nodemailer = require("nodemailer");

exports.sendEmail = async function sendEmail({ title, content }) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.EMAIL_ACCOUNT, // sender address
    to: process.env.EMAIL_ACCOUNT, // list of receivers
    subject: title || "새로운 계산기 등록 ✔", // Subject line
    text: content || "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
};