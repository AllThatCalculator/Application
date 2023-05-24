const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../models");
const { CustomError } = require("../../utils/CustomError");

/**
 * 계산기에 대해 현재 수정중인 계산기 정보를 합치는 함수
 * @param {*} myCalculetList 계산기 전체
 * @param {*} myCalculetTempList 현재 수정중인 계산기
 * @returns 최종 계산기 리스트
 */
function mergeCalculets({ myCalculetList, myCalculetTempList }) {
  // add temp calculet
  let tempIdx = 0;
  myCalculetList.map((calculet) => {
    if (calculet.isEdit) {
      let calculetTemp = null;
      if (calculet.id === myCalculetTempList[tempIdx].calculetId) {
        calculetTemp = myCalculetTempList[tempIdx++];
      } else {
        // 만약 id가 일치하지 않는다면 find연산으로 수정중인 계산기 찾기
        console.log("id 불일치로 find연산 실행");
        calculetTemp = myCalculetTempList.find(
          (e) => e.calculetId === calculet.id
        );
      }
      delete calculetTemp.calculetId;
      calculet.calculetTemp = calculetTemp;
    }
  });
  return myCalculetList;
}

/**
 * 마이 계산기 리스트 얻어오는 함수
 *
 * [고려해야 할 케이스]
 *
 * 1. 첫 등록 후 등록 대기 중인 계산기
 * 2. 등록 이후 수정 요청 중인 계산기 (유일하게 isEdit 필드가 True)
 * 3. 등록 완료된 계산기 (수정 요청 X)
 *
 * [로직]
 *
 * 전체 계산기들을 모두 가져온 후, 수정 중인 임시 계산기 정보는 따로 가져와서 합치는 로직
 *
 * 1. 전체 계산기 가져오기
 *  (1) LEFT JOIN을 통해 calculet_info와 calculet_info_temp 테이블을 조인해서 데이터를 얻어옴 (이때 temp 테이블에 관한 정보는 모두 null로 가져옴)
 *      - 해당 과정에서 위의 2번과 3번 케이스에 대한 계산기들이 가져와짐
 *  (2) RIGHT JOIN을 통해 1번 케이스의 계산기들을 얻어옴
 *      - 이때, (1)과 데이터가 겹치지 않기 위해 INNER JOIN되는 데이터는 제외하고 가져옴
 * 2. 수정 중인 임시 계산기 정보 가져오기
 *  - INNER JOIN을 해서 2번 케이스 계산기의 calculet_info_temp 정보만 가져옴
 * 3. 1, 2에서 얻은 계산기 정보를 합침
 *  - 1번과 2번 계산기 모두 calculet_info테이블의 created_at 필드값을 기준으로 오름차순 정렬해서 가져옴
 *  - 따라서 1번 계산기를 한 번 돌리면서, isEdit이 True인 필드에 calculet_info_temp 정보를 넣어줌
 */
exports.getMyCalculetList = async (req, res) => {
  const filter =
    req.query.blocked !== undefined ? req.query.blocked : [0, 1, 2];
  const { size, page } = req.query;

  // set where option from blocked filter
  let whereOption = "";
  if (filter.includes(0) && !filter.includes(1)) {
    whereOption = "Info.blocked = 0 AND";
  } else if (filter.includes(1) && !filter.includes(0)) {
    whereOption = "Info.blocked = 1 AND";
  }

  // set full sql
  let filterSql = "";
  if (filter.includes(0) || filter.includes(1)) {
    filterSql += `
    SELECT Info.id as id, Info.title, Info.description, Info.category_main_id as categoryMainId, Info.category_sub_id as categorySubId, Info.created_at as createdAt,
    Info.view_cnt as viewCnt, Info.like_cnt as likeCnt, Info.bookmark_cnt as bookmarkCnt, Info.blocked, IF(Temp.id is NULL, False, True) as isEdit, NULL as calculetTemp
    FROM calculet_info Info
    LEFT JOIN calculet_info_temp Temp ON Info.id = Temp.calculet_id
    WHERE ${whereOption} Info.contributor_id = '${res.locals.userId}'
    `;
  }
  if (filter.includes(2)) {
    if (filterSql !== "") {
      filterSql += `
      UNION
      `;
    }
    filterSql += `
    SELECT Temp.id, Temp.title, Temp.description, Temp.category_main_id as categoryMainId, Temp.category_sub_id as categorySubId, Temp.created_at as createdAt, 
    0 as viewCnt, 0 as likeCnt, 0 as bookmarkCnt, 2 as blocked, False as isEdit, NULL as calculetTemp
    FROM calculet_info Info
    RIGHT JOIN calculet_info_temp Temp ON Info.id = Temp.calculet_id
    WHERE Info.id is NULL AND Temp.contributor_id = '${res.locals.userId}'
    `;
  }

  // get calculet info & calculet info temp (full outer join)
  const sqlFull = `
    ${filterSql}
    ORDER BY createdAt
    LIMIT ${size}
    OFFSET ${size * (page - 1)}
  `;
  // get calculet info temp intersection (inner join)
  const sqlTemp = `
    SELECT Temp.id, Temp.title, Temp.description, Temp.category_main_id as categoryMainId, Temp.category_sub_id as categorySubId, Temp.created_at as createdAt, 
    2 as blocked, 0 as viewCnt, 0 as likeCnt, 0 as bookmarkCnt, False as isEdit, Temp.calculet_id as calculetId
    FROM calculet_info Info
    JOIN calculet_info_temp Temp ON Info.id = Temp.calculet_id
    WHERE ${whereOption} Info.contributor_id = '${res.locals.userId}'
    ORDER BY Info.created_at
  `;

  try {
    const result = await sequelize.transaction(async (t) => {
      const myCalculetList = await sequelize.query(
        sqlFull,
        {
          type: QueryTypes.SELECT,
          nest: true,
        },
        { transaction: t }
      );
      const myCalculetTempList = await sequelize.query(
        sqlTemp,
        {
          type: QueryTypes.SELECT,
          nest: true,
        },
        { transaction: t }
      );
      return { myCalculetList, myCalculetTempList };
    });

    const myCalculetList = mergeCalculets(result);
    res
      .status(200)
      .send({ calculetList: myCalculetList, count: myCalculetList.length });
  } catch (error) {
    console.log(error);
    throw new CustomError(400, 0);
  }
};
