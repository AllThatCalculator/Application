const { errorMessage } = require("./errorMessage");

/**
 * custom error class
 * 
 */
module.exports = class CustomError {
  constructor(statusCode, errorCode) {
    this.code = statusCode;
    this.message = errorMessage[statusCode][errorCode];
    console.error(this.message);
  }
};