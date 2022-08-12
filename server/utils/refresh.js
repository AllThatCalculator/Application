const { sign, verify, refreshVerify } = require("./jwt");
const jwt = require("jsonwebtoken");

module.exports = {
  // access token이 만료되었을 때, 토큰 재발급을 위해 실행하는 함수
  refresh: (accessToken, refreshToken) => {
    // access token 복호화하여 user 정보 가져오기
    const decoded = jwt.decode(accessToken);

    // 디코딩 결과가 없으면 권한이 없음을 응답
    if (decoded === null) {
      return false;
    }

    // 유저 email 가져와 refresh token 검증
    const refreshResult = refreshVerify(refreshToken, decoded.email);

    // 1.refresh token도 만료 -> 새로 로그인
    if (refreshResult.ok === false) {
      return false;
    } else {
      // 2. refresh token 은 만료되지 않은 경우 -> 새로운 access token을 발급
      const userInfo = { email: decoded.email };
      const newAccessToken = sign(userInfo);

      return {
        accessToken: newAccessToken,
        refreshToken: refreshToken,
      };
    }
  },
};
