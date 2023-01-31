const { Op } = require("sequelize");
const { models } = require("../../models");
const { errorObject } = require("../../utils/errorMessage");

async function postRecords(req, res) {
  // check request body
  if (!req.body.calculetId || !req.body.recordArray) {
    res.status(400).send(errorObject(400, 1));
    return;
  }
  const calculetId = req.body.calculetId;
  const userId = res.locals.userId;

  // check if calculet exists
  const calculet = await models.calculetInfo.findByPk(calculetId);
  if (calculet === null || calculet.blocked) {
    res.status(404).send();
    return;
  }

  // process data
  const recordArray = req.body.recordArray.map((element) => ({
    user_id: userId,
    calculet_id: calculetId,
    input: JSON.stringify(element.inputObj),
    output: JSON.stringify(element.outputObj),
    created_at: element.createdAt,
  }));

  // put data into database
  await models.calculetRecord.bulkCreate(recordArray);

  res.status(201).send();
}

async function getRecords(req, res) {
  const records = await models.calculetRecord.findAll({
    attributes: ["input", "output", "created_at", "id"],
    where: {
      calculet_id: {
        [Op.eq]: req.params.calculetId,
      },
      user_id: {
        [Op.eq]: res.locals.userId,
      },
    },
    order: [["created_at", "DESC"]],
  });

  // process data
  const responseData = records.map((row) => {
    return {
      inputObj: JSON.parse(row.input),
      outputObj: JSON.parse(row.output),
      createdAt: row.created_at,
      id: row.id,
    };
  });

  res.status(200).send(responseData);
}

async function deleteRecords(req, res) {
  // check request body
  if (!req.body.calculetId || !req.body.recordIdList) {
    res.status(400).send(errorObject(400, 1));
    return;
  }
  // delete records
  await models.calculetRecord.destroy({
    where: {
      user_id: {
        [Op.eq]: res.locals.userId, // for authorize
      },
      calculet_id: {
        [Op.eq]: req.body.calculetId, // for double check
      },
      id: {
        [Op.in]: req.body.recordIdList,
      },
    },
  });
  res.status(204).send();
}

exports.record = {
  post: postRecords,
  get: getRecords,
  delete: deleteRecords,
};
