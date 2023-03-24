const { Op } = require("sequelize");
const { models, sequelize } = require("../../models");
const { timestamp } = require("../../utils/timestamp");
const { accessController } = require("../utils/accessController");

/**
 * 임시 테이블에서 본 테이블로 옮기는 함수
 * created_at은 임시 테이블 등록 기준으로 등록, updated_at이 등록 시점이 된다.
 * @param {object} record 임시 계산기 객체
 */
function publishCalculet(record) {
  // 본 테이블 등록
  record.updated_at = new Date(); // updated_at 갱신
  return sequelize.transaction(async (t) => {
    // move to calculetInfo table
    await models.calculetInfo.create(record, {
      transaction: t
    });
    // delete from temporary table
    await models.calculetInfoTemp.destroy({
      where: {
        id: {
          [Op.eq]: record.id
        }
      },
      transaction: t
    });
  });
}

const calculetTempResource = {
  resource: models.calculetInfoTemp,
  ...accessController(),
};

calculetTempResource.options.actions.publish = {
  isAccessible: ({ currentAdmin }) => (currentAdmin.accessLevel >= 2),
  actionType: "record",
  component: false,
  handler: async (request, response, context) => {
    const { record, currentAdmin } = context;

    await publishCalculet(record.params);

    // 로그
    console.log(`${timestamp()} | ${record.id()} published by ${currentAdmin.email}`);
    return {
      record: record.toJSON(currentAdmin),
      msg: "Register completed",
      redirectUrl: "/admin/resources/calculet_info_temp"
    };
  },
  guard: "등록하시겠습니까?",
  icon: "Add",
};

module.exports = { calculetTempResource };