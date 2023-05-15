const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../models");

/**
 * 마이 계산기 리스트 얻어오는 함수
 */
exports.getMyCalculetList = async (req, res) => {
  // get calculet info & calculet info temp (full outer join)
  const sqlFull = `
    SELECT Info.id as id, Info.title, Info.description, Info.category_main_id as categoryMainId, Info.category_sub_id as categorySubId, Info.created_at as createdAt,
    Info.view_cnt as viewCnt, Info.like_cnt as likeCnt, Info.bookmark_cnt as bookmarkCnt, Info.blocked, IF(Temp.id is NULL, False, True) as isEdit, Info.id as calculetId, NULL as calculetTemp
    FROM calculet_info Info
    LEFT JOIN calculet_info_temp Temp ON Info.id = Temp.calculet_id
    WHERE Info.contributor_id = '${res.locals.userId}'
    UNION
    SELECT Temp.id, Temp.title, Temp.description, Temp.category_main_id as categoryMainId, Temp.category_sub_id as categorySubId, Temp.created_at as createdAt, 
    0 as viewCnt, 0 as likeCnt, 0 as bookmarkCnt, 2 as blocked, False as isEdit, Temp.calculet_id as calculetId, NULL as calculetTemp
    FROM calculet_info Info
    RIGHT JOIN calculet_info_temp Temp ON Info.id = Temp.calculet_id
    WHERE Info.id is NULL and Temp.contributor_id = '${res.locals.userId}'
    ORDER BY createdAt
  `;
  // get calculet info temp intersection (inner join)
  const sqlTemp = `
    SELECT Temp.id, Temp.title, Temp.description, Temp.category_main_id as categoryMainId, Temp.category_sub_id as categorySubId, Temp.created_at as createdAt, 
    2 as blocked, 0 as viewCnt, 0 as likeCnt, 0 as bookmarkCnt, False as isEdit, Temp.calculet_id as calculetId
    FROM calculet_info Info
    JOIN calculet_info_temp Temp ON Info.id = Temp.calculet_id
    WHERE Info.contributor_id = '${res.locals.userId}'
    ORDER BY Info.created_at
  `;
  const myCalculetList = await sequelize.query(sqlFull, {
    type: QueryTypes.SELECT,
    nest: true,
  });
  const myCalculetTempList = await sequelize.query(sqlTemp, {
    type: QueryTypes.SELECT,
    nest: true,
  });

  // add temp calculet
  let tempIdx = 0;
  myCalculetList.map((calculet) => {
    if (calculet.isEdit) {
      calculet.calculetTemp = myCalculetTempList[tempIdx++];
    }
  });
  res.status(200).send(myCalculetList);
};
