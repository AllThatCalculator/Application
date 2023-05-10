const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../models");
const { models } = require("../../models");

/**
 * 마이 계산기 리스트 얻어오는 함수
 */
exports.getMyCalculetList = async (req, res) => {
  const attributeOption = [
    "id",
    "title",
    "description",
    "categoryMainId",
    "categorySubId",
    "createdAt",
    "blocked",
    "viewCnt",
    "likeCnt",
    "bookmarkCnt",
    "isEdit",
    "calculetId",
  ];

  // create association temporarily because of join
  models.calculetInfoTemp.belongsTo(models.calculetInfo, {
    foreignKey: "calculetId",
  });
  models.calculetInfo.hasMany(models.calculetInfoTemp, {
    as: "calculetTemp",
    foreignKey: "calculetId",
  });

  // get calculet info table
  const myCalculetList = await models.calculetInfo.findAll({
    attributes: attributeOption,
    where: {
      contributorId: res.locals.userId,
    },
    include: [
      // calculet temp
      {
        model: models.calculetInfoTemp,
        attributes: attributeOption,
        as: "calculetTemp",
      },
    ],
    order: [["createdAt"]],
  });

  // get calculet info temp table
  const sql = `
    SELECT Temp.id, Temp.title, Temp.description, Temp.category_main_id as categoryMainId, Temp.category_sub_id as categorySubId, Temp.created_at as createdAt, 
    2 as blocked, 0 as viewCnt, 0 as likeCnt, 0 as bookmarkCnt, false as isEdit, Temp.calculet_id as calculetId
    FROM calculet_info Info
    RIGHT JOIN calculet_info_temp Temp ON Info.id = Temp.calculet_id
    WHERE Info.id is NULL and Temp.contributor_id = '${res.locals.userId}'
  `;
  const myCalculetTempList = await sequelize.query(sql, {
    type: QueryTypes.SELECT,
    nest: true,
  });
  myCalculetList.push(...myCalculetTempList);
  myCalculetList.sort(function (a, b) {
    // 등록 일자순
    return a.createdAt - b.createdAt;
  });
  res.status(200).send(myCalculetList);
};
