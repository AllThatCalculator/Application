const { admin } = require("../config/firebase");
const { models } = require("../models");
const { errorObject } = require("../utils/errorMessage");
const { getTokenFromHeader } = require("../utils/tokenHandler");
const { errorHandler } = require("./errorHandler");

/**
 * 미들웨어 - 인증이 필요한 api 앞단에서 클라이언트의 토큰 유효성 검사
 * - (로그인 O) firebase 검증 수행
 * - (로그인 X) 에러메세지 리턴
 */
async function validateFirebase(req, res, next) {
  const idToken = getTokenFromHeader(req.headers);

  if (idToken === null) {
    // token not found
    res.status(401).send(errorObject(401, -1));
    return;
  }

  try {
    // verify token
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);

    // check if registered
    if (!decodedIdToken.registered) {
      res.status(401).send(errorObject(401, 2));
    }

    res.locals.userId = decodedIdToken.user_id;
    res.locals.email = decodedIdToken.email;
    res.locals.registered = decodedIdToken.registered;

    next();
  } catch (error) {
    console.error(error.code);

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
 * 미들웨어 - 로그인 한 경우에만 토큰 유효성 검사
 * - (로그인 O) firebase 검증 수행
 * - (로그인 X) 다음 로직 수행
 */
async function verifyFirebase(req, res, next) {
  const idToken = getTokenFromHeader(req.headers);

  if (idToken === null) {
    // token not found
    next();
    return;
  }

  await validateFirebase(req, res, next);
}

/**
 * @property {function} validate 로그인 필수
 * @property {function} verify 로그인 선택
 * 
 * 로그인 확인 된 경우
 *   @var {string} res.locals.userId firebase uid
 *   @var {string} res.locals.email firebase email
 *   @var {boolean} res.locals.registered sign up completed
 */
exports.auth = {
  validate: validateFirebase,
  verify: verifyFirebase,
};
