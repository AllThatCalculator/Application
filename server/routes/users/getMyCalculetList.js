const { models } = require("../../models");
const { Op } = require("sequelize");

/**
 * 마이 계산기 리스트 얻어오는 함수
 */
exports.getMyCalculetList = async (req, res) => {
  const option = {
    attributes: [
      "id",
      "title",
      "description",
      "categoryMainId",
      "categorySubId",
      "createdAt",
      "blocked",
      "viewCnt",
      "likeCnt",
      "bookmarkCnt",
    ],
    where: {
      contributorId: {
        [Op.eq]: res.locals.userId,
      },
    },
  };

  const myCalculetList = await models.calculetInfo.findAll(option);
  myCalculetList.push(...(await models.calculetInfoTemp.findAll(option)));
  myCalculetList.sort(function (a, b) {
    // 등록 일자순
    return a.createdAt - b.createdAt;
  });
  res.status(200).send(myCalculetList);
};
