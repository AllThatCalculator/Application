const { verify } = require("../utils/jwt");

exports.auth = (req, res, next) => {
  // 클라이언트 쿠키에서 토큰 가져오기
  const token = req.cookies.access_token;

  // 토큰 복호화해서 유저 이메일 얻기
  const result = verify(token);

  if (result.ok) {
    //token이 검증되었으면 req에 값 세팅 후, 다음 콜백함수로 넘어가기
    req.email = result.email;
    next();
  } else {
    // 유효시간이 초과된 경우
    if (result.message === "jwt expired") {
      res.status(202).send({
        message: "access token 유효기간 만료. refresh 요청 필요",
      });
    } else {
      // 토큰의 비밀키가 맞지 않는 등의 예외
      res.status(401).send({
        success: false,
        message: result.message,
      });
    }
  }
};
