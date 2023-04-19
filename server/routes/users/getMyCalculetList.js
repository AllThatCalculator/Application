const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../models");

const calculetAttributes = `id, title, description, category_main_id as categoryMainId, category_sub_id as categorySubId, created_at as createdAt`;
const calculetInfoAttributes = `, blocked, view_cnt as viewCnt, like_cnt as likeCnt, bookmark_cnt as bookmarkCnt`;
const calculetTempAttributes = `, 2 as blocked, 0 as viewCnt, 0 as likeCnt, 0 as bookmarkCnt`;

/**
 * 계산기 리스트 얻어오는 함수
 */
async function getCalculetList(tableName, contributorId) {
  let attributes = calculetAttributes;
  if (tableName === "calculet_info") {
    attributes += calculetInfoAttributes;
  } else {
    attributes += calculetTempAttributes;
  }

  const calculetList = await sequelize.query(
    `SELECT ${attributes} FROM ${tableName} WHERE contributor_id='${contributorId}' ORDER BY createdAt`,
    { type: QueryTypes.SELECT, nest: true }
  );
  return calculetList;
}

/**
 * 마이 계산기 리스트 얻어오는 함수
 */
async function getMyCalculetList(req, res) {
  let myCalculetList = await getCalculetList(
    "calculet_info",
    res.locals.userId
  );
  myCalculetList.push(
    ...(await getCalculetList("calculet_info_temp", res.locals.userId))
  );
  res.status(200).send(myCalculetList);
}

module.exports = { getMyCalculetList };
