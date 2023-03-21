const { Op } = require("sequelize");
const { models } = require("../models");
const { timestamp } = require("../utils/timestamp");

/**
 * 임시 테이블에서 본 테이블로 옮기는 함수
 * created_at은 임시 테이블 등록 기준으로 등록, updated_at이 등록 시점이 된다.
 * @param {object} record 임시 계산기 객체
 */
function publishCalculet(record) {
  // 본 테이블 등록
  record.updated_at = new Date(); // updated_at 갱신
  models.calculetInfo.create(record);

  // 임시 테이블에서 삭제
  models.calculetInfoTemp.destroy({
    where: {
      id: {
        [Op.eq]: record.id
      }
    }
  });

  // 로그
  console.log(`${timestamp()} | ${record.id()} published`);
}

const calculetTempResource = {
  resource: models.calculetInfoTemp,
  options: {
    properties: {
      src_code: {
        // type: "richtext",
        props: {
          // style: {
          //   whiteSpace: 'pre-wrap'
          // },
          // quill: {
          //   // theme: "snow"
          // },
          // borderless: true
        }
      }
    },
    actions: {
      show: {
        after: async (originalResponse, req, context) => {
          // console.log(req);
          const { record } = originalResponse;
          // console.log(record.params);
          const hljs = require('highlight.js');
          const html = hljs.highlight(record.params.src_code, { language: "html" });
          // console.log(html);
          // console.log(html);
          originalResponse.record.params.src_code = html.value;
          return originalResponse;
        },
      },
      Publish: {
        actionType: "record",
        component: false,
        handler: (request, response, context) => {
          const { record, currentAdmin } = context;

          publishCalculet(record.params);

          return {
            record: record.toJSON(),
            msg: "Register completed",
            redirectUrl: "/admin/resources/calculet_info_temp"
          };
        },
        guard: "등록하시겠습니까?",
        icon: "Add",
      },
    },
  }
};
module.exports = { calculetTempResource };