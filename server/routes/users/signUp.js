const bcrypt = require("bcryptjs");
const mariadb = require("../../config/database");

// bcrypt 암호화하기 위해 필요한 상수
const saltRounds = 10;

exports.signUp = (req, res) => {
  // 비밀번호 암호화
  let pw = req.body.pw;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (!err) {
      bcrypt.hash(pw, salt, async function (err, hash) {
        if (!err) {
          // 암호화된 비밀번호로 저장
          pw = hash;

          // 프로필 이미지 blob으로 변경
          // 프론트엔드에서 전달받은 base64String
          let base64String = req.body.profileImg;
          // blob으로 변경해서 저장할 변수
          let blobImage = null;
          // 기본 이미지가 아닌 경우에만 blob으로 decode
          if (base64String !== "/img/defaultProfile.png") {
            blobImage = base64String.split(";base64,").pop();
            blobImage = Buffer.from(blobImage, "base64");
          }

          // 데이터 삽입
          const userInfoData = [
            req.body.email,
            req.body.userName,
            blobImage,
            req.body.bio,
            req.body.sex,
            req.body.birthdate,
            req.body.job,
          ];

          const userLoginData = [req.body.email, pw];

          const userInfoQuery = `INSERT INTO user_info VALUES(?,?,?,?,?,?,?);`;
          const userLoginQuery = `INSERT INTO user_login(user_email, pw) VALUES(?,?);`;

          const sql1 = mariadb.format(userInfoQuery, userInfoData);
          const sql2 = mariadb.format(userLoginQuery, userLoginData);

          try {
            await mariadb.query(sql1 + sql2);
            res.status(201).send({
              success: true,
              location: `/users/${req.body.email}`,
            });
          } catch (err) {
            res.status(400).send({
              success: false,
              message:
                "request parameters was wrong. retry request after change parameters",
              err,
            });
          }
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
