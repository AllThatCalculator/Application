const { Op } = require("sequelize");
const { admin } = require("../../config/firebase");
const { models } = require("../../models");

/**
 * firebase에서 유저 삭제하는 API (임시)
 * @param {*} userId firebase uid
 */
function deleteUserFromFirebase(userId) {
  return admin.auth().deleteUser(userId);
}

/**
 * database에서 유저 삭제하는 API (임시)
 *  유저와 관련된 계산기, 계산 기록, 북마크, 좋아요 여부 전부 날아갈 수 있으니 유의할 것.
 * @param {*} userId firebase uid
 */
function deleteUserFromDatabase(userId) {
  return models.userInfo.destroy({
    where: {
      id: {
        [Op.eq]: userId,
      },
    },
  });
  // 프로필 있을 경우 S3 버킷에서도 지워야 함
}

exports.deleteUser = {
  firebase: deleteUserFromFirebase,
  database: deleteUserFromDatabase,
};
