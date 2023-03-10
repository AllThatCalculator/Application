const { Op } = require("sequelize");
const { models } = require("../../models");

/**
 * 대분류, 소분류 ID로 카테고리 ID 찾기
 * @param {*} mainId 대분류 ID
 * @param {*} subId 소분류 ID
 * @returns category ID
 */
async function getCategoryId(mainId, subId) {
  const filter = {};
  if (typeof mainId === "number") {
    filter.main_id = {
      [Op.eq]: mainId
    };
  }
  if (typeof subId === "number") {
    filter.sub_id = {
      [Op.eq]: subId
    };
  }

  const { id } = await models.category.findOne({
    where: filter
  });

  return id;
}

async function postCalculets(req, res) {
  const categoryId = await getCategoryId(req.body.categoryMainId, req.body.categorySubId);
  // 데이터 생성
  await models.calculetInfoTemp.create({
    title: req.body.title,
    src_code: req.body.srcCode,
    manual: req.body.manual,
    description: req.body.description,
    category_id: categoryId,
    contributor_id: res.locals.userId,
  });

  res.status(201).send("/");
}

module.exports = { postCalculets };
