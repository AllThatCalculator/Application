const { Op } = require("sequelize");
const { models, sequelize } = require("../../../models2");

/**
 * 유저/계산기에 대해 북마크 여부 리턴
 * @param {string} userId 유저 uid
 * @param {string} calculetId 계산기 uuid
 * @returns 북마크 여부 (true/false)
 */
function checkBookmark(userId, calculetId) {
  return models.userCalculetBookmark
    .findOne({
      where: {
        userId,
        calculetId: {
          [Op.eq]: calculetId,
        },
      },
    })
    .then((result) => {
      if (result === null) {
        return false;
      }
      return true;
    });
}

async function putBookMark(req, res) {
  const userId = res.locals.userId;
  const calculetId = req.params.calculetId;
  const calculet = await models.calculetInfo.findByPk(calculetId);

  if (calculet === null) {
    res.status(404).send();
    return;
  }

  if (await checkBookmark(userId, calculetId)) {
    res.status(200).send({ bookmarkCnt: calculet.bookmarkCnt });
    return;
  }

  try {
    /**
     * transaction
     * 1. user_calculet_bookmark에 행 추가
     * 2. 계산기 bookmark_cnt <- bookmark_cnt + 1
     */
    await sequelize.transaction(async (t) => {
      await models.userCalculetBookmark.create(
        { userId, calculetId },
        { transaction: t }
      );
      await calculet.increment("bookmarkCnt", {
        transaction: t,
      });
    });
    res.status(200).send({ bookmarkCnt: calculet.bookmarkCnt + 1 });
  } catch (error) {
    console.error(error);
    res.status(400).send({ bookmarkCnt: calculet.bookmarkCnt });
  }
}

async function removeBookMark(req, res) {
  const userId = res.locals.userId;
  const calculetId = req.params.calculetId;
  const calculet = await models.calculetInfo.findByPk(calculetId);

  if (calculet === null) {
    res.status(404).send();
    return;
  }

  if (!(await checkBookmark(userId, calculetId))) {
    res.status(200).send({ bookmarkCnt: calculet.bookmarkCnt });
    return;
  }

  try {
    /**
     * transaction
     * 1. user_calculet_bookmark에 행 삭제
     * 2. 계산기 bookmark_cnt <- bookmark_cnt - 1
     */
    await sequelize.transaction(async (t) => {
      await models.userCalculetBookmark.destroy({
        where: { userId, calculetId },
        transaction: t,
      });
      await calculet.decrement("bookmarkCnt", {
        transaction: t,
      });
    });
    res.status(200).send({ bookmarkCnt: calculet.bookmarkCnt - 1 });
  } catch (error) {
    console.error(error);
    res.status(400).send({ bookmarkCnt: calculet.bookmarkCnt });
  }
}

async function listBookmark(req, res) {
  const userId = res.locals.userId;

  const bookmarkList = await models.userCalculetBookmark.findAll({
    include: [
      {
        model: models.calculetInfo,
        required: true,
        attributes: ["title", "id"],
        as: "calculet",
      },
    ],
    where: { userId },
  });

  const responseData = bookmarkList.map((element) => element.toJSON().calculet);

  res.status(200).send(responseData);
  return;
}

exports.userBookmark = {
  mark: putBookMark,
  remove: removeBookMark,
  check: checkBookmark,
  list: listBookmark,
};
