const jwt = require("jsonwebtoken");
const mariadb = require("../../config/database");

exports.logout = (req, res) => {
  // 클라이언트 정보 얻기
  const decoded = jwt.decode(req.cookies.access_token);

  // 디코딩 결과가 없으면 권한이 없음을 응답
  if (decoded === null) {
    return res.status(401).send({
      success: false,
      message: "권한 없음",
    });
  }

  // 클라이언트 쿠키에 있는 토큰 지우기
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");

  // DB에 있는 refresh token 지우기
  const sql = `update user_login set refresh_token='' where user_email='${decoded.email}'`;
  mariadb.query(sql, (err, result, fields) => {
    if (!err) {
      // 로그아웃 완료
      res.status(200).send({ success: true, message: "로그아웃 성공" });
    } else {
      res.status(400).send({ success: false, message: "로그아웃 실패" });
    }
  });
};
