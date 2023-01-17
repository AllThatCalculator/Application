const { errorObject } = require("../utils/errorMessage");

/**
 * 기본 에러 핸들러
 * - 백엔드 로직에 예상하지 못한 버그가 있는 경우 app crash 발생 예방
 */
function defaultErrorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(errorObject(500, 0));
}

/**
 * 비동기 요청 위한 wrapper
 */

const asyncWrapper = (asyncFunc) => {
  return (req, res, next) => {
    asyncFunc(req, res, next).catch(next);
  };
};

const dbErrorHandler = (asyncFunc) => {
  return (req, res, next) => {
    asyncFunc(req, res, next).catch((error) => {
      console.log(error);
      console.log("error occured during creating record to DB");
      res.status(400).send(errorObject(400, 0));
    });
  };
};

exports.errorHandler = {
  default: defaultErrorHandler,
  asyncWrapper: asyncWrapper,
  dbWrapper: dbErrorHandler,
};
