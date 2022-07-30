const bcrypt = require("bcryptjs");
const { sign, refresh } = require("../../utils/jwt");
const mariadb = require("../../config/database");
const redisClient = require("../../utils/redis");

exports.login = async (req, res) => {
  const { userEmail, pw } = req.body;

  // 요청 이메일 DB에서 찾기
  const sql = `select * from user_login where user_email='${userEmail}'`;

  mariadb.query(sql, async (err, rows, fields) => {
    if (!err) {
      // 계정이 없는 경우
      if (rows.length === 0) {
        return res.status(404).send({
          loginSuccess: false,
          message: "계정을 찾을 수 없습니다.",
        });
      }

      const userLogin = rows[0];

      // 비밀번호 일치하는지 검사
      const isEqualPw = await bcrypt.compare(`${pw}`, userLogin.pw);

      // 일치하지 않으면
      if (!isEqualPw) {
        return res.status(401).send({
          loginSuccess: false,
          message: "잘못된 비밀번호입니다.",
        });
      }
      // 일치한다면 토큰 생성
      const userInfo = { email: userEmail };
      const accessToken = sign(userInfo);
      const refreshToken = refresh();

      // 발급한 refresh token을 redis에 key: userInfo.email로 하여 저장
      redisClient.set(userInfo.email, refreshToken);

      // 토큰 2개 모두 쿠키에 저장
      res
        .cookie("access_token", accessToken, {
          httpOnly: true,
        })
        .cookie("refresh_token", refreshToken, {
          httpOnly: true,
        })
        .status(200)
        .send({ loginSuccess: true, userEmail: userEmail });
    } else {
      res.status(403).send({ loginSuccess: false, message: "계정 조회 실패" });
    }
  });
};
