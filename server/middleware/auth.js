const { admin } = require("../config/firebase");
const { CustomError } = require("../utils/CustomError");
const { getTokenFromHeader } = require("../utils/tokenHandler");
const https = require("https");
const { bufferToString } = require("../utils/bufferConverter");

/**
 * Firebase 인증 관련 에러 핸들러
 */
const authWrapper = (asyncFunc) => {
  return (req, res, next) =>
    asyncFunc(req, res, next).catch((error) => {
      res.status(401);
      switch (error.code) {
        // token not found
        case "token-not-found":
          res.send(CustomError.errorObject(401, -1));
          break;
        // expired token
        case "auth/id-token-expired":
          res.send(CustomError.errorObject(401, 0));
          break;
        // invalid token
        case "auth/argument-error":
          res.send(CustomError.errorObject(401, 1));
          break;
        // not in database
        case "unregistered":
          res.send(CustomError.errorObject(401, 2));
          break;
        case "auth/user-not-found":
          res.send(CustomError.errorObject(401, 3));
          break;
        default:
          res.send();
      }
    });
};

/**
 * 미들웨어 - 인증이 필요한 api 앞단에서 클라이언트의 토큰 유효성 검사
 * - (로그인 O) firebase 검증 수행
 * - (로그인 X) 에러메세지 리턴
 */
async function validateFirebase(req, res, next) {
  const idToken = getTokenFromHeader(req.headers);

  if (idToken === null) {
    // token not found
    throw {
      code: "token-not-found",
    };
  }

  // verify token
  const decodedIdToken = await admin.auth().verifyIdToken(idToken, true);

  // check if registered
  if (!decodedIdToken.registered) {
    throw {
      code: "unregistered",
    };
  }

  res.locals.userId = decodedIdToken.user_id;
  res.locals.email = decodedIdToken.email;
  res.locals.registered = decodedIdToken.registered;

  next();
}

/**
 * 미들웨어 - 로그인 한 경우에만 토큰 유효성 검사
 * - (로그인 O) firebase 검증 수행
 * - (로그인 X) 다음 로직 수행
 */
async function verifyFirebase(req, res, next) {
  const idToken = getTokenFromHeader(req.headers);

  if (idToken === null) {
    next();
    return;
  }

  await validateFirebase(req, res, next);
}

/**
 * 회원가입 전인 유저 확인하는 미들웨어
 *   @var {string} res.locals.userId firebase uid
 *   @var {string} res.locals.email firebase email
 */
async function signUpAuth(req, res, next) {
  const idToken = getTokenFromHeader(req.headers);

  if (idToken === null) {
    // token not found
    throw {
      code: "token-not-found",
    };
  }

  // verify token
  const decodedIdToken = await admin.auth().verifyIdToken(idToken, true);

  if (decodedIdToken.registered) {
    res.send(409).send(CustomError.errorObject(409, 0));
    return;
  }

  res.locals.userId = decodedIdToken.user_id;
  res.locals.email = decodedIdToken.email;

  next();
}

/**
 * 관리자 권한이 있는지 확인하는 미들웨어
 *   @var {string} res.locals.userId firebase uid
 *   @var {string} res.locals.email firebase email
 */
async function validateAdmin(req, res, next) {
  const idToken = req.session?.adminUser?.idToken;

  if (!idToken) {
    // token not found
    throw {
      code: "token-not-found",
    };
  }

  const decodedIdToken = await admin.auth().verifyIdToken(idToken);
  // check if registered
  if (!decodedIdToken.registered) {
    throw {
      code: "unregistered",
    };
  }
  // check admin right
  if (!decodedIdToken.admin) {
    throw {
      code: "unauthorized",
    };
  }

  req.session.adminUser.accessLevel = decodedIdToken.accessLevel;

  res.locals.userId = decodedIdToken.user_id;
  res.locals.accessLevel = decodedIdToken.accessLevel;

  next();
}

/**
 * firebase REST API로 email/password 로그인 요청 보내는 함수 - 에러 처리 필요
 * @param {string} email
 * @param {string} password
 * @returns firebase request promise
 */
async function postEmailAndPassword(email, password) {
  const postData = JSON.stringify({
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const options = {
    hostname: "identitytoolkit.googleapis.com",
    path: `/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
    port: 443,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": postData.length,
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      const responseData = [];
      res.on("data", (data) => {
        responseData.push(data);
      });
      res.on("end", () => {
        const responseString = bufferToString(Buffer.concat(responseData));
        // login failed
        if (res.statusCode < 200 || res.statusCode > 299) {
          console.log(responseString);
          reject(new CustomError(401, 3));
        }
        resolve(JSON.parse(responseString));
      });
    });

    req.on("error", (err) => {
      console.error(err);
      reject(new CustomError(400, 0));
    });

    req.on("timeout", () => {
      req.destroy();
      console.error("firebase request timeout");
      reject(new CustomError(400, 0));
    });

    req.write(postData);
    req.end();
  });
}

/**
 * login handler for admin page
 * @param {string} email
 * @param {string} password
 * @returns 세션에 저장될 정보 / 로그인 실패시 null
 */
async function adminLoginHandler(email, password) {
  try {
    const identified = await postEmailAndPassword(email, password);

    const decodedIdToken = await admin.auth().verifyIdToken(identified.idToken);

    if (decodedIdToken.registered && decodedIdToken.admin) {
      return {
        email: email,
        idToken: identified.idToken,
        accessLevel: decodedIdToken.accessLevel,
      };
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * @property {function} validate 로그인 필수
 * @property {function} verify 로그인 선택
 * @property {function} admin 관리자 권한 확인
 * @property {function} login 관리자 로그인
 *
 * 로그인 확인 된 경우
 *   @var {string} res.locals.userId firebase uid
 *   @var {string} res.locals.email firebase email
 *   @var {boolean} res.locals.registered sign up completed
 */
exports.auth = {
  validate: authWrapper(validateFirebase),
  verify: authWrapper(verifyFirebase),
  signUp: authWrapper(signUpAuth),
  admin: authWrapper(validateAdmin),
  login: adminLoginHandler,
  postFirebase: postEmailAndPassword,
};
