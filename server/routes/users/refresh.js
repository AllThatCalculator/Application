const { sign, verify, refreshVerify } = require("../../utils/jwt");
const jwt = require("jsonwebtoken");

exports.refresh = async (req, res) => {
  // access token과 refresh token의 존재 유무를 체크
  if (req.cookies.access_token && req.cookies.refresh_token) {
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;

    // access token 검증 -> 만료되어야함
    const accessResult = verify(accessToken);

    // access token 복호화하여 user 정보 가져오기
    const decoded = jwt.decode(accessToken);

    // 디코딩 결과가 없으면 권한이 없음을 응답
    if (decoded === null) {
      res.status(401).send({
        success: false,
        message: "권한 없음",
      });
    }

    // 유저 email 가져와 refresh token 검증
    const refreshResult = refreshVerify(refreshToken, decoded.email);

    // 재발급을 위해서는 access token이 만료되어 있어야 함
    if (accessResult.ok === false && accessResult.message === "jwt expired") {
      // 1.access token이 만료되고, refresh token도 만료 -> 새로 로그인
      if (refreshResult.ok === false) {
        res.status(401).send({
          success: false,
          message: "권한 없음",
        });
      } else {
        // 2. access token 이 만료되고, refresh token 은 만료되지 않은 경우 -> 새로운 access token을 발급
        const userInfo = { email: decoded.email };
        const newAccessToken = sign(userInfo);

        res
          .cookie("access_token", newAccessToken, {
            httpOnly: true,
          })
          .cookie("refresh_token", refreshToken, {
            httpOnly: true,
          })
          .status(200)
          .send({
            success: true,
          });
      }
    } else {
      // 3. access token이 만료되지 않은 경우 -> refresh 할 필요 x
      res.status(400).send({
        success: false,
        message: "Access token is not expired!",
      });
    }
  } else {
    // 쿠키에 토큰 없는 경우
    res.status(400).send({
      success: false,
      message: "Access token and refresh token are need for refresh!",
    });
  }
};
