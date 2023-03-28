const { Op } = require("sequelize");
const { admin } = require("../../config/firebase");
const { models } = require("../../models");
const { deleteObjectFromS3 } = require("../s3Bucket/profile");

/**
 * firebase에서 유저 삭제하는 API
 * @param {*} userId firebase uid
 */
function deleteUserFromFirebase(userId) {
  return admin.auth().deleteUser(userId);
}

/**
 * database에서 유저 삭제하는 API
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
}

/**
 * firebase와 database, s3 bucket에서 유저 정보 모두 삭제하는 함수
 */
async function deleteUser(req, res) {
  // s3 bucket profile 삭제
  const user = await models.userInfo.findByPk(res.locals.userId, {
    attributes: ["profile_img"],
  });
  if (user.profile_img) {
    await deleteObjectFromS3(user.profile_img);
  }

  // db & firebase에 있는 정보 삭제
  await deleteUserFromDatabase(res.locals.userId);
  await deleteUserFromFirebase(res.locals.userId);
  res.status(204).send();
}

exports.deleteUser = {
  default: deleteUser,
  firebase: deleteUserFromFirebase,
  database: deleteUserFromDatabase,
};
