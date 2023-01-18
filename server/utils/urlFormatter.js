const prefix = {
  profileImg: "/file/profile",
};

/**
 * 브라우져에 전달할 url을 완성해서 리턴함
 * @param {string} type
 * - 프로필 이미지 : "profileImg"
 * @param {string} uri
 * @returns full url to client
 */
exports.urlFormatter = (type, uri) => {
  return `${prefix[type]}/${uri}`;
};
