const { admin } = require("../config/firebase");
const { models } = require("../models");
const { errorObject } = require("../utils/errorMessage");
const { getTokenFromHeader } = require("../utils/tokenHandler");
const { errorHandler } = require("./errorHandler");

/**
 * 미들웨어 - 인증이 필요한 api 앞단에서 클라이언트의 토큰 유효성 검사 (firebase)
 * res.locals.userId - firebase uid
 * res.locals.email - firebase email
 */
async function authFirebase(req, res, next) {
  const idToken = getTokenFromHeader(req.headers);

  if (idToken === null) {
    // token not found
    res.status(401).send(errorObject(401, -1));
    return;
  }

  try {
    // verify token
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    res.locals.userId = decodedIdToken.user_id;
    res.locals.email = decodedIdToken.email;
    next();
  } catch (error) {
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
  }
}
async function verifyFirebase(req, res, next) {
  const idToken = getTokenFromHeader(req.headers);

  if (idToken === null) {
    // token not found
    next();
    return;
  }

  try {
    // verify token
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    res.locals.userId = decodedIdToken.user_id;
    res.locals.email = decodedIdToken.email;
    next();
  } catch (error) {
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
  }
}
/**
 * 미들웨어 - 인증이 필요한 api 앞단에서 가입된 유저인지 확인 후 유저 정보 저장
 * res.locals.userInfo 참조
 *  - id
 *  - email
 *  - user_name
 *  - profile_img
 *  - bio
 *  - sex
 *  - birthdate
 *  - job
 *  - created_at
 *  - updated_at
 */
async function authDatabase(req, res, next) {
  const userInfo = await models.userInfo.findByPk(res.locals.userId);

  if (userInfo == null) {
    res.status(401).send({
      code: 2,
      message: "can't find user",
    });
  } else {
    res.locals.userInfo = userInfo.dataValues;
    next();
  }
  return;
}

exports.auth = {
  firebase: authFirebase,
  database: errorHandler.dbWrapper(authDatabase),
  checkFirebase: errorHandler.asyncWrapper(verifyFirebase),
};
