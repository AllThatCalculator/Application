const mariadb = require("../config/database");

exports.findUser = (req, res, next) => {
  // 클라이언트 정보에서 이메일 저장
  const email = req.body.email;

  // DB에서 계정 조회
  const sql = `select user_email from user_login where user_email='${email}'`;
  mariadb.query(sql, (err, rows, fields) => {
    if (!err) {
      // 계정이 없는 경우
      if (rows.length === 0) {
        req.exist = false;
        return next();
      } else {
        // 계정이 있는 경우
        return res
          .status(400)
          .send({ success: false, message: "이미 존재하는 계정입니다." });
      }
    } else {
      return res.status(400).send({
        message:
          "request parameters was wrong. retry request after change parameters",
        err,
      });
    }
  });
};
