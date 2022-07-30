const bcrypt = require("bcryptjs");
const mariadb = require("../../config/database");

// bcrypt 암호화하기 위해 필요한 상수
const saltRounds = 10;

exports.signUp = (req, res) => {
  // 비밀번호 암호화
  let pw = req.body.pw;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (!err) {
      bcrypt.hash(pw, salt, function (err, hash) {
        if (!err) {
          // 암호화된 비밀번호로 저장
          pw = hash;

          // 데이터 삽입
          const userInfoData = [
            req.body.email,
            req.body.userName,
            req.body.profileImg,
            req.body.bio,
            req.body.sex,
            req.body.birthdate,
            req.body.job,
          ];
          const userLoginData = [req.body.email, pw];

          const userInfoQuery = `INSERT INTO user_info VALUES(?,?,?,?,?,?,?);`;
          const userLoginQuery = `INSERT INTO user_login VALUES(?,?);`;

          const sql1 = mariadb.format(userInfoQuery, userInfoData);
          const sql2 = mariadb.format(userLoginQuery, userLoginData);

          mariadb.query(sql1 + sql2, (err, result, fields) => {
            if (!err) {
              res.status(201).send({ location: `/users/${req.body.email}` });
            } else {
              res.status(400).send({
                message:
                  "request parameters was wrong. retry request after change parameters",
                err,
              });
            }
          });
        } else {
          res
            .status(403)
            .send({ success: false, message: "비밀번호 암호화 실패" });
        }
      });
    } else {
      res.status(403).send({ success: false, message: "비밀번호 암호화 실패" });
    }
  });
};
