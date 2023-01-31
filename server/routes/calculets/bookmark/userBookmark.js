const { Op } = require("sequelize");
const { models, sequelize } = require("../../../models");

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
        user_id: {
          [Op.eq]: userId,
        },
        calculet_id: {
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
  const calculet = await models.calculetStatistics.findByPk(calculetId);

  if (await checkBookmark(userId, calculetId)) {
    res.status(200).send({ bookmarkCnt: calculet.bookmark_cnt });
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
        {
          user_id: userId,
          calculet_id: calculetId,
        },
        { transaction: t }
      );
      await calculet.increment("bookmark_cnt", {
        transaction: t,
      });
    });
    res.status(200).send({ bookmarkCnt: calculet.bookmark_cnt + 1 });
  } catch (error) {
    console.log(error);
    res.status(400).send({ bookmarkCnt: calculet.bookmark_cnt });
  }
}

async function removeBookMark(req, res) {
  const userId = res.locals.userId;
  const calculetId = req.params.calculetId;
  const calculet = await models.calculetStatistics.findByPk(calculetId);

  if (!(await checkBookmark(userId, calculetId))) {
    res.status(200).send({ bookmarkCnt: calculet.bookmark_cnt });
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
        where: { user_id: userId, calculet_id: calculetId },
        transaction: t,
      });
      await calculet.decrement("bookmark_cnt", {
        transaction: t,
      });
    });
    res.status(200).send({ bookmarkCnt: calculet.bookmark_cnt - 1 });
  } catch (error) {
    console.log(error);
    res.status(400).send({ bookmarkCnt: calculet.bookmark_cnt });
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
    where: {
      user_id: {
        [Op.eq]: userId,
      },
    },
  });

  const responseData = bookmarkList.map((element) => ({
    title: element.calculet.title,
    id: element.calculet.id,
  }));

  res.status(200).send(responseData);
  return;
}

exports.userBookmark = {
  mark: putBookMark,
  remove: removeBookMark,
  check: checkBookmark,
  list: listBookmark,
};
