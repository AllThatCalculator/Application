const { admin } = require("../config/firebase");
const { models } = require("../models");
const sequelize = require("sequelize");
const { errorObject } = require("../utils/errorMessage");

/**
 * 미들웨어 - 인증이 필요한 api 앞단에서 클라이언트의 토큰 유효성 검사 (firebase)
 */
async function authFirebase(req, res, next) {
  let idToken = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    // get token from header
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    // token not found
    res.status(401).send({
      code: -1,
      message: "can't find token",
    });
    return;
  }

  // verify token
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedIdToken) => {
      res.locals.userId = decodedIdToken.user_id;
      res.locals.email = decodedIdToken.email;
      next();
    })
    .catch((error) => {
      console.log(error.code);

      res.status(401);

      switch (error.code) {
        // expired token
        case "auth/id-token-expired":
          res.send(errorObject(401, 0));
          break;
        // invalid token
        case "auth/argument-error":
          res.send(errorObject(401, 1));
          break;
      }
    });
}

/**
 * 미들웨어 - 인증이 필요한 api 앞단에서 가입된 유저인지 확인 (DB)
 * @returns
 */
async function authDatabase(req, res, next) {
  const userInfo = await models.userInfo.findOne({
    where: {
      id: {
        [sequelize.Op.eq]: res.locals.userId,
      },
    },
  });

  if (userInfo == null) {
    res.status(401).send({
      code: 2,
      message: "can't find user",
    });
  } else {
    next();
  }
  return;
}

exports.auth = {
  firebase: authFirebase,
  database: authDatabase,
};
