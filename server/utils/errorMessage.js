const message = {
  400: {
    code0: "request failed",
  },
  401: {
    "code-1": "can't find token",
    code0: "token expired",
    code1: "invalid token",
    code2: "can't find user",
  },
  500: {
    code0: "failed",
  },
};

exports.errorObject = (statusCode, errorCode) => {
  return {
    code: errorCode,
    message: message.statusCode[`code${errorCode}`],
  };
};
