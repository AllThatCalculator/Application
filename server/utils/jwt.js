const jwt = require("jsonwebtoken");
const mariadb = require("../config/database");
const secret = process.env.SECRET_KEY;

module.exports = {
  sign: (user) => {
    // access token 발급
    const payload = {
      email: user.email,
    };
    return jwt.sign(payload, secret, {
      algorithm: "HS256", // 암호화 알고리즘
      expiresIn: "1m", // 유효기간
    });
  },
  verify: (token) => {
    // access token 검증
    let decoded = null; // 토큰 복호화한 결과 저장
    try {
      decoded = jwt.verify(token, secret);
      return {
        ok: true,
        email: decoded.email,
      };
    } catch (err) {
      return {
        ok: false,
        message: err.message,
      };
    }
  },
  refresh: () => {
    // refresh token 발급
    return jwt.sign({}, secret, {
      // refresh token은 payload 없이 발급
      algorithm: "HS256", // 암호화 알고리즘
      expiresIn: "14d", // 유효기간
    });
  },
  refreshVerify: async (token, userEmail) => {
    // refresh token 검증
    const sql = `select refresh_token from user_login where user_email='${userEmail}'`;

    mariadb.query(sql, (err, rows, fields) => {
      if (!err) {
        // refresh token 가져오기
        const data = rows[0].refresh_token;

        if (data !== null) {
          if (token === data) {
            try {
              jwt.verify(token, secret);
              return true;
            } catch (err) {
              return false;
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
  },
};
