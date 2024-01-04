const { validationResult } = require("express-validator");
const { CustomError } = require("../utils/CustomError");

exports.inputValidator = (req, res, next) => {
  const error = validationResult(req);
  // request invalid
  if (!error.isEmpty()) {
    console.log(error.mapped());
    throw new CustomError(400, 1);
  }

  next();
};
