const { verify } = require("../utils/jwt");
const { refresh } = require("../utils/refresh");

exports.auth = (req, res, next) => {
  // access token, refresh token 둘 중 하나라도 없다면 바로 401 응답
  if (!req.cookies.access_token || !req.cookies.refresh_token) {
    return res.status(401).send({ success: false });
  }

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
      // refresh token이 있다면 재발급 시도
      if (req.cookies.refresh_token) {
        const newToken = refresh(
          req.cookies.access_token,
          req.cookies.refresh_token
        );
        if (newToken.accessToken) {
          // 재발급 완료 됐다면(인가 완료) 쿠키에 저장 후, req에 사용자 정보를 담아서 다음 콜백 함수로 넘어가기
          req.email = verify(newToken.accessToken).email;

          res
            .cookie("access_token", newToken.accessToken, {
              httpOnly: true,
            })
            .cookie("refresh_token", newToken.refreshToken, {
              httpOnly: true,
            });

          next();
        } else {
          res
            .status(401)
            .send({ success: false, message: "token was expired" });
        }
      } else {
        res.status(401).send({ success: false, message: "no refresh token" });
      }
    } else {
      // 토큰이 없거나 토큰의 비밀키가 맞지 않는 등의 예외
      res.status(401).send({
        success: false,
        message: result.message,
      });
    }
  }
};
