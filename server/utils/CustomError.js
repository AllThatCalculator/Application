const message = {
  /**
   * parameter 등이 잘못되었을 때
   */
  400: {
    0: "request failed",
    1: "request information is invalid",
  },
  /**
   * 로그인 등 인증 문제
   */
  401: {
    "-1": "can't find token",
    "0": "token expired",
    "1": "invalid token",
    "2": "can't find user",
    "3": "user not found",
  },
  /**
   * 권한 문제
   */
  403: {
    0: "access denied",
    1: "unauthorized",
  },

  404: {
    0: "not found",
    1: "id not exist",
  },
  /**
   * 중복 등록
   */
  409: {
    0: "already exist",
  },
  /**
   * 서버 오류 - 원칙적으로 나면 안됨
   */
  500: {
    0: "failed",
  },
};

/**
 * custom error class
 */

class CustomError {
  static errorObject(statusCode, errorCode) {
    return {
      code: errorCode,
      message: message[statusCode][errorCode],
    };
  }

  /**
   * 각 에러 별 세부 사항은 아래 노션 링크에 작성
   * {@link https://www.notion.so/Error-code-9e2aeb37404e48cda8dae8328556156a notion document}
   * @param {number} statusCode Http status code
   * @param {number} errorCode custom error code
   * @returns error class
   */
  constructor(statusCode, errorCode) {
    this.statusCode = statusCode;
    this.info = CustomError.errorObject(statusCode, errorCode);
    console.error(this.info.message);
  }
}

module.exports = { CustomError };
