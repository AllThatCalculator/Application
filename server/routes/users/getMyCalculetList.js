const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../models");
const { models } = require("../../models");

/**
 * 마이 계산기 리스트 얻어오는 함수
 */
exports.getMyCalculetList = async (req, res) => {
  // get calculet info & calculet info temp full outer join
  const sql = `
  SELECT Temp.id, Temp.title, Temp.description, Temp.category_main_id as categoryMainId, Temp.category_sub_id as categorySubId, Temp.created_at as createdAt, 
  0 as viewCnt, 0 as likeCnt, 0 as bookmarkCnt, 2 as blocked, False as isEdit, Temp.calculet_id as calculetId
  FROM calculet_info Info
  RIGHT JOIN calculet_info_temp Temp ON Info.id = Temp.calculet_id
  WHERE Info.id is NULL and Temp.contributor_id = '${res.locals.userId}'
  ORDER BY createdAt
  `;
  const myCalculetList = await sequelize.query(sql, {
    type: QueryTypes.SELECT,
    nest: true,
  });
  res.status(200).send(myCalculetList);
};

/**
 * Temp.id as tempId, Temp.title as tempTitle, Temp.description as tempDesc, Temp.category_main_id as tempCategoryMainId, Temp.category_sub_id as tempCategorySubId, Temp.created_at as tempCreatedAt, 
    2 as tempBlocked, 0 as tempViewCnt, 0 as tempLikeCnt, 0 as tempBookmarkCnt, False as tempIsEdit, Temp.calculet_id as tempCalculetId
    
 */
/**
 * SELECT Info.id, Info.title, Info.description, Info.category_main_id as categoryMainId, Info.category_sub_id as categorySubId, Info.created_at as createdAt,
    Info.view_cnt as viewCnt, Info.like_cnt as likeCnt, Info.bookmark_cnt as bookmarkCnt, Info.blocked, IF(Temp.id != null, True, False) as isEdit, Info.id as calculetId,
    FROM calculet_info Info
    LEFT JOIN calculet_info_temp Temp ON Info.id = Temp.calculet_id
    WHERE Info.contributor_id = '${res.locals.userId}'
 *     UNION
    SELECT Temp.id, Temp.title, Temp.description, Temp.category_main_id as categoryMainId, Temp.category_sub_id as categorySubId, Temp.created_at as createdAt, 
    0 as viewCnt, 0 as likeCnt, 0 as bookmarkCnt, 2 as blocked, False as isEdit, Temp.calculet_id as calculetId
    FROM calculet_info Info
    RIGHT JOIN calculet_info_temp Temp ON Info.id = Temp.calculet_id
    WHERE Info.id is NULL and Temp.contributor_id = '${res.locals.userId}'
    ORDER BY createdAt
 */
