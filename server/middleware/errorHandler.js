const { CustomError } = require("../utils/CustomError");

/**
 * 기본 에러 핸들러
 * - 백엔드 로직에 예상하지 못한 버그가 있는 경우 app crash 발생 예방
 */
function defaultErrorHandler(err, req, res, next) {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send(err.info);
    return;
  }

  console.error(err);
  res.status(500).send(CustomError.errorObject(500, 0));
}

/**
 * 비동기 요청 위한 wrapper
 */
const asyncWrapper = (asyncFunc) => {
  return (req, res, next) => {
    asyncFunc(req, res, next).catch((err) => {
      if (err instanceof CustomError) {
        res.status(err.statusCode).send(err.info);
        return;
      }
      console.error(err);
      res.status(500).send(CustomError.errorObject(500, 0));
    });
  };
};

/**
 * DB 에러 핸들러
 *   - sequelize 에러 별 대응 구현 필요
 */
const dbErrorHandler = (asyncFunc) => {
  return (req, res, next) => {
    asyncFunc(req, res, next).catch((err) => {
      if (err instanceof CustomError) {
        res.status(err.statusCode).send(err.info);
        return;
      }

      console.error(err);
      console.error("error occured during creating record to DB");
      res.status(400).send(CustomError.errorObject(400, 0));
    });
  };
};

/**
 * @property {function} default 기본 에러 핸들러
 * @property {function} asyncWrapper 비동기 함수 에러 핸들러
 * @property {function} dbWrapper DB 함수 에러 핸들러
 */
exports.errorHandler = {
  default: defaultErrorHandler,
  asyncWrapper: asyncWrapper,
  dbWrapper: dbErrorHandler,
};
