exports.getTokenFromHeader = (headers) => {
  if (headers.authorization && headers.authorization.startsWith("Bearer ")) {
    // get token from header
    return headers.authorization.split("Bearer ")[1];
  }
  return null;
};
