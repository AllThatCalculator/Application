const { admin } = require("../config/firebase");

/**
 * 미들웨어 - 인증이 필요한 api 앞단에서 클라이언트의 토큰 유효성 검사
 */
function checkIdToken(req, res, next) {
  let idToken = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    // get token from header
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    // token not found
    res.status(401).send("Unauthorized");
  }

  // verify token
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedIdToken) => {
      // Verify token and do something with decodedIdToken
      console.log(decodedIdToken);
      next();
    })
    .catch((error) => {
      console.log(error.code);

      res.status(401);

      switch (error.code) {
        // expired token
        case "auth/id-token-expired":
          res.send("token-expired");
        // invalid token
        case "auth/argument-error":
          res.send("Unauthorized");
      }
    });
}

exports.auth = checkIdToken;
