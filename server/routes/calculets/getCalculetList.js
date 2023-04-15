const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../models");
const PREVIEW_CNT = 6;

const calculetPreviewAttributes = `calculet.id, title, description, categoryMainId, category_sub_id as categorySubId, view_cnt as viewCnt,
user_name as "contributor.userName", concat("/file/profile/", contributor.profile_img) as "contributor.profileImgSrc"`;

/**
 * 각 대분류/소분류 별 계산기 목록
 */
async function getCalculetList(req, res) {
  const calculetList = await sequelize.query(`
  SELECT
  ${calculetPreviewAttributes}
	FROM calculet_info calculet
    INNER JOIN user_info contributor on contributor_id = contributor.id
    INNER JOIN (
      SELECT
        category_main_id as categoryMainId, category_sub_id as categorySubId,
        GROUP_CONCAT(calculet.id ORDER BY view_cnt DESC) grouped_id
      FROM calculet_info calculet
      GROUP BY categoryMainId, categorySubId) group_max
    ON categoryMainId = group_max.categoryMainId AND categorySubId = group_max.categorySubId
      AND FIND_IN_SET(calculet.id, grouped_id) BETWEEN 1 AND ${PREVIEW_CNT}
  ORDER BY
    categoryMainId, categorySubId, viewCnt DESC;
  `, { type: QueryTypes.SELECT, nest: true });

  const response = {};
  calculetList.map((calculet) => {
    const { categoryMainId, categorySubId } = calculet;
    if (response[categoryMainId] === undefined) {
      response[categoryMainId] = {};
    }
    if (response[categoryMainId][categorySubId] === undefined) {
      response[categoryMainId][categorySubId] = Array();
    }
    response[categoryMainId][categorySubId].push(calculet);
  });

  res.status(200).send(response);
}

/**
 * 각 대분류 별 단위변환기 목록
 */
async function getConverters(req, res) {
  const calculetList = await sequelize.query(`
  SELECT
    ${calculetPreviewAttributes}
    FROM calculet_info calculet
    INNER JOIN user_info contributor on contributor_id = contributor.id
    INNER JOIN (
      SELECT
        category_main_id as categoryMainId,
        GROUP_CONCAT(calculet.id ORDER BY view_cnt DESC) grouped_id
      FROM calculet_info calculet
      WHERE category_sub_id = 0
      GROUP BY categoryMainId) group_max
    ON categoryMainId = group_max.categoryMainId
      AND FIND_IN_SET(calculet.id, grouped_id) BETWEEN 1 AND ${PREVIEW_CNT}
  ORDER BY
    categoryMainId, viewCnt DESC;
  `,
    { type: QueryTypes.SELECT, nest: true });

  const response = {};
  calculetList.map((calculet) => {
    const { categoryMainId } = calculet;
    if (response[categoryMainId] === undefined) {
      response[categoryMainId] = Array();
    }
    response[categoryMainId].push(calculet);
  });

  res.status(200).send(response);
}

exports.getCalculetList = {
  default: getCalculetList,
  converters: getConverters,
};
