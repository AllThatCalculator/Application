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
  record.updatedAt = new Date(); // updated_at 갱신
  record.blocked = 0; // blocked 초기화

  // 데이터 존재 여부 확인
  const data = models.calculetInfoTemp.findByPk(record.id);
  if (data === null) {
    throw "CustomNotExitError";
  }

  // 임시 계산기의 calculetId로 id 변경
  const tempId = record.id;
  record.id = record.calculetId;

  return sequelize.transaction(async (t) => {
    // move to calculetInfo table
    if (record.registered === true) {
      // 등록됐었던 계산기라면 -> 업데이트
      await models.calculetInfo.update(record, {
        where: {
          id: {
            [Op.eq]: record.id,
          },
        },
        transaction: t,
      });
    } else {
      await models.calculetInfo.create(record, {
        transaction: t,
      });
    }

    // delete from temporary table
    await models.calculetInfoTemp.destroy({
      where: { id: tempId },
      transaction: t,
    });

    // send email to contributor
    if (process.env.NODE_ENV === "production") {
      const { sendEmail } = require("../../utils/emailSender");
      sendEmail
        .user(record.id, record.title, record.contributorId)
        .catch(console.error);
    }
  });
}

const calculetTempResource = {
  resource: models.calculetInfoTemp,
  ...accessController(),
};

// add custom action
calculetTempResource.options.actions.publish = {
  isAccessible: ({ currentAdmin }) => currentAdmin.accessLevel >= 2,
  actionType: "record",
  component: false,
  handler: async (req, res, context) => {
    const { record, currentAdmin } = context;
    try {
      await publishCalculet(record.params);
      // 로그
      console.log(
        `${timestamp()} | ${record.id()} published by ${currentAdmin.email}`
      );
      return {
        record: record.toJSON(currentAdmin),
        redirectUrl: "/admin/resources/calculet_info_temp",
        notice: {
          message: "계산기 등록 완료",
          type: "success",
        },
      };
    } catch (error) {
      console.error(error);
      if (error === "CustomNotExitError") {
        return {
          record: record.toJSON(currentAdmin),
          redirectUrl: "/admin/resources/calculet_info_temp",
          notice: {
            message: "새로운 수정 사항이 생겼습니다.",
            type: "error",
          },
        };
      } else {
        return {
          record: record.toJSON(currentAdmin),
          notice: {
            message: "계산기 등록 실패",
            type: "error",
          },
        };
      }
    }
  },
  guard: "등록하시겠습니까?",
  icon: "CalculatorCheck",
};

calculetTempResource.options.actions.showCode = {
  isAccessible: ({ currentAdmin }) => currentAdmin.accessLevel >= 1,
  actionType: "record",
  component: false,
  handler: async (req, res, context) => {
    const { record, currentAdmin } = context;
    return {
      redirectUrl: `/admin/api/show-code/${record.params.id}`,
      record: record.toJSON(currentAdmin),
    };
  },
};

module.exports = { calculetTempResource };
