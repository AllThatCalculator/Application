const { models } = require("../../models");
const { CustomError } = require("../../utils/CustomError");
const { matchedData } = require("express-validator");

/**
 * 계산기 ID에 대한 key가 주어졌을 때, where 옵션을 리턴하는 함수
 * @param {*} calculetKey 계산기 ID 필드 이름 (id or calculetId)
 * @param {*} calculetInfo 계산기 정보
 * @returns object
 */
function getWhereOption(calculetKey, calculetInfo) {
  return {
    where: {
      [calculetKey]: calculetInfo.id,
      contributorId: calculetInfo.contributorId,
    },
  };
}

/**
 * calculet_info, calculet_info_temp 테이블을 조회해서 각각 계산기를 얻어오는 함수
 * @param {*} calculetInfo 계산기 정보들
 */
async function getCalculet(calculetInfo, whereIdOption) {
  if (calculetInfo.blocked === 2) {
    return await models.calculetInfoTemp.findOne(whereIdOption);
  }
  // check exist calculet temp (because if exist calculet temp, then should modify temp table, not info)
  const temp = await models.calculetInfoTemp.findOne(
    getWhereOption("calculetId", calculetInfo)
  );
  if (temp) {
    console.log("Editing temp calculet is exist");
    throw new CustomError(400, 1);
  }
  return await models.calculetInfo.findOne(whereIdOption);
}

/**
 * [고려해야 할 케이스]
 *
 *                                   <calculetTemp 삭제> <update log 삭제> <registered> <calculetTemp 생성> <update log 생성>
 * 1. 첫 등록 후 등록 대기 중인 계산기         O                  X             False             O                  X
 * 2. 등록 이후 수정 요청 중인 계산기          O                  O             True              O                  O
 * 3. 등록 완료된 계산기 (수정 중 없음)        X                  X             True              O                  O
 */
async function updateMyCalculet(req, res) {
  const bodyData = matchedData(req, { locations: ["body"] });
  const { calculetInfo, updateMessage } = bodyData;

  // set calculet id & contributor id
  calculetInfo.calculetId = calculetInfo.id;
  calculetInfo.contributorId = res.locals.userId;

  const whereIdOption = getWhereOption("id", calculetInfo);
  const calculet = await getCalculet(calculetInfo, whereIdOption);

  if (calculet === null) {
    throw new CustomError(404, 0);
  }

  // if blocked === 2, then delete temp & update log
  if (calculetInfo.blocked === 2) {
    calculetInfo.calculetId = calculet.calculetId;

    // delete temp data
    await models.calculetInfoTemp.destroy(whereIdOption);

    // if registered is true, then delete update log (latest)
    if (calculet.registered) {
      const latestUpdateLog = await models.calculetUpdateLog.findOne({
        where: { calculetId: calculet.calculetId },
        order: [["createdAt", "DESC"]],
        limit: 1,
      });
      latestUpdateLog.destroy();
    }
  }

  // if only calculet info or calculet temp & registered true
  if (
    calculetInfo.blocked !== 2 ||
    (calculetInfo.blocked === 2 && calculet.registered)
  ) {
    // create update log
    await models.calculetUpdateLog.create({
      calculetId: calculetInfo.calculetId,
      message: updateMessage,
    });

    // change registered
    calculetInfo.registered = true;
  }

  // create calculet info temp
  delete calculetInfo.id;
  await models.calculetInfoTemp.create(calculetInfo);
  res.status(204).send();
}

module.exports = { updateMyCalculet };
