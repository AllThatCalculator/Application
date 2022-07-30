const jwt = require("../utils/jwt");

exports.auth = (req, res, next) => {
  // 클라이언트 쿠키에서 토큰 가져오기
  const token = req.cookies.access_token;

  // 토큰 복호화해서 유저 이메일 얻기
  const result = jwt.verify(token);

  if (result.ok) {
    //token이 검증되었으면 req에 값 세팅 후, 다음 콜백함수로 넘어가기
    req.email = result.email;
    next();
  } else {
    // 유효시간이 초과되거나 토큰의 비밀키가 일치하지 않는 경우
    res.status(401).send({
      success: false,
      message: result.message,
    });
  }
};
