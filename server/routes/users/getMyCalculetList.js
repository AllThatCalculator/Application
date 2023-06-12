const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../models");

/**
 * 현재 수정중인 계산기 정보를 objects로 묶는 함수
 * @param {*} myCalculetList 계산기 전체
 * @returns 최종 계산기 리스트
 */
function bindTempCalculet(myCalculetList) {
  const result = [];
  myCalculetList.filter((calculet) => {
    const obj = {
      id: calculet.id,
      title: calculet.title,
      description: calculet.description,
      categoryMainId: calculet.categoryMainId,
      categorySubId: calculet.categorySubId,
      createdAt: calculet.createdAt,
      viewCnt: calculet.viewCnt,
      likeCnt: calculet.likeCnt,
      bookmarkCnt: calculet.bookmarkCnt,
      blocked: calculet.blocked,
      isEdit: !!calculet.isEdit,
      calculetTemp: null,
    };
    if (calculet.tempId != null) {
      obj.calculetTemp = {
        id: calculet.tempId,
        title: calculet.tempTitle,
        description: calculet.tempDesc,
        categoryMainId: calculet.tempCategoryMainId,
        categorySubId: calculet.tempCategorySubId,
        createdAt: calculet.tempCreatedAt,
        blocked: calculet.tempBlocked,
        viewCnt: calculet.tempViewCnt,
        likeCnt: calculet.tempLikeCnt,
        bookmarkCnt: calculet.tempBookmarkCnt,
        isEdit: !!calculet.tempIsEdit,
      };
    }
    result.push(obj);
  });
  return result;
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
 * 1. LEFT JOIN을 통해 calculet_info와 calculet_info_temp 테이블을 조인해서 데이터를 얻어옴
 *   - 해당 과정에서 위의 2번과 3번 케이스에 대한 계산기들이 가져와짐
 *   - 2번 케이스는 임시 계산기 정보도 같이 얻어와짐
 * 2. RIGHT JOIN을 통해 1번 케이스의 계산기들을 얻어옴
 *   - 이때, (1)과 데이터가 겹치지 않기 위해 INNER JOIN되는 데이터는 제외하고 가져옴
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
    SELECT SQL_CALC_FOUND_ROWS Info.id, Info.title, Info.description, Info.category_main_id as categoryMainId, Info.category_sub_id as categorySubId, Info.created_at as createdAt,
    Info.view_cnt as viewCnt, Info.like_cnt as likeCnt, Info.bookmark_cnt as bookmarkCnt, Info.blocked, IF(Temp.id is NULL, False, True) as isEdit, 
    Temp.id as tempId, Temp.title as tempTitle, Temp.description as tempDesc, Temp.category_main_id as tempCategoryMainId, Temp.category_sub_id as tempCategorySubId, Temp.created_at as tempCreatedAt, 
    2 as tempBlocked, 0 as tempViewCnt, 0 as tempLikeCnt, 0 as tempBookmarkCnt, False as tempIsEdit
    FROM calculet_info Info
    LEFT JOIN calculet_info_temp Temp ON Info.id = Temp.calculet_id
    WHERE ${whereOption} Info.contributor_id = '${res.locals.userId}'
    `;
  }
  if (filter.includes(2)) {
    filterSql +=
      filterSql === "" ? "SELECT SQL_CALC_FOUND_ROWS" : "UNION SELECT";
    filterSql += `
    Temp.id, Temp.title, Temp.description, Temp.category_main_id as categoryMainId, Temp.category_sub_id as categorySubId, Temp.created_at as createdAt, 
    0 as viewCnt, 0 as likeCnt, 0 as bookmarkCnt, 2 as blocked, False as isEdit,
    Info.id as tempId, Info.title as tempTitle, Info.description as tempDesc, Info.category_main_id as tempCategoryMainId, Info.category_sub_id as tempCategorySubId, Info.created_at as tempCreatedAt, 
    2 as tempBlocked, 0 as tempViewCnt, 0 as tempLikeCnt, 0 as tempBookmarkCnt, False as tempIsEdit
    FROM calculet_info Info
    RIGHT JOIN calculet_info_temp Temp ON Info.id = Temp.calculet_id
    WHERE Info.id is NULL AND Temp.contributor_id = '${res.locals.userId}'
    `;
  }

  // get calculet info & calculet info temp (full outer join)
  const sqlFull = `
    ${filterSql}
    ORDER BY createdAt DESC
    LIMIT ${size}
    OFFSET ${size * (page - 1)}
  `;
  const sqlCount = "SELECT FOUND_ROWS() as count";

  const result = await sequelize.query(sqlFull, {
    type: QueryTypes.SELECT,
    nest: true,
  });
  const [total] = await sequelize.query(sqlCount, {
    type: QueryTypes.SELECT,
    nest: true,
  });

  const myCalculetList = bindTempCalculet(result);
  res.status(200).send({ calculetList: myCalculetList, count: total.count });
};
