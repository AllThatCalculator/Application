const bcrypt = require("bcryptjs");
const { sign, refresh } = require("../../utils/jwt");
const mariadb = require("../../config/database");

exports.login = async (req, res) => {
  const { email, pw } = req.body;

  try {
    // 요청 이메일 DB에서 찾기
    const sqlEmail = `select * from user_login where user_email='${email}'`;
    const rows = await mariadb.query(sqlEmail);

    // 계정이 없는 경우
    if (rows[0].length === 0) {
      return res.status(404).send({
        success: false,
        message: "계정을 찾을 수 없습니다.",
      });
    }

    const userLogin = rows[0][0];

    // 비밀번호 일치하는지 검사
    const isEqualPw = await bcrypt.compare(`${pw}`, userLogin.pw);

    // 일치하지 않으면
    if (!isEqualPw) {
      return res.status(401).send({
        success: false,
        message: "잘못된 비밀번호입니다.",
      });
    }
    // 일치한다면 토큰 생성
    const userInfo = { email: email };
    const accessToken = sign(userInfo);
    const refreshToken = refresh();

    // 발급한 refresh token을 user_login의 refresh_token 부분에 update
    const sql = `update user_login set refresh_token='${refreshToken}' where user_email='${email}'`;
    try {
      await mariadb.query(sql);
      // 토큰 2개 모두 쿠키에 저장
      res
        .cookie("access_token", accessToken, {
          httpOnly: true,
        })
        .cookie("refresh_token", refreshToken, {
          httpOnly: true,
        })
        .status(200)
        .send({ success: true, userEmail: email });
    } catch (err) {
      res.status(400).send({ success: false, message: "토큰 저장 실패" });
    }
  } catch (err) {
    res.status(403).send({ success: false, message: "계정 조회 실패" });
  }
};
