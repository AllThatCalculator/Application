const { models } = require("../../models");
const { CustomError } = require("../../utils/CustomError");

exports.getMyCalculetInfo = async (req, res) => {
  const option = {
    attributes: [
      "id",
      "title",
      "description",
      "categoryMainId",
      "categorySubId",
      "srcCode",
      "manual",
      "blocked",
      "type",
    ],
    include: [
      // contributor
      {
        model: models.userInfo,
        required: true,
        attributes: ["id", "userName", "profileImgSrc"],
        as: "contributor",
      },
    ],
    where: {
      id: req.params.calculetId,
      contributorId: res.locals.userId,
    },
  };

  let calculet = null;
  if (req.query.blocked === 2) {
    calculet = await models.calculetInfoTemp.findOne(option);
  } else {
    calculet = await models.calculetInfo.findOne(option);
  }

  if (calculet === null) {
    throw new CustomError(404, 0);
  }
  res.status(200).send(calculet);
};
