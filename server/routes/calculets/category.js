const mariadb = require("../../config/database");

exports.category = async (req, res) => {
  // 카테고리 대분류
  const categoryMainQuery = `select * from category_main where id < 99999 order by id;`;

  // 카테고리 소분류
  const categorySubQuery = `select * from category_sub order by id;`;

  try {
    const rows = await mariadb.query(categoryMainQuery + categorySubQuery);
    const main = rows[0][0];
    const sub = rows[0][1];

    const mainOptionList = [];
    const subOptionList = [[]];

    for (let i = 0; i < main.length; i++) {
      mainOptionList.push({ value: main[i].id, name: main[i].main });
      // 대분류마다 단위 변환기 소분류 추가 (기타 제외)
      if (i < main.length - 1) {
        subOptionList[i + 1] = [{ value: sub[0].id, name: sub[0].sub }];
      } else {
        subOptionList[i] = [];
      }
    }

    for (let i = 0; i < sub.length - 1; i++) {
      subOptionList[sub[i].main_id].push({
        value: sub[i].id,
        name: sub[i].sub,
      });
    }

    // 대분류마다 기타 소분류 추가 (단위 변환기 대분류 제외)
    for (let i = 1; i < main.length; i++) {
      subOptionList[i].push({
        value: sub[sub.length - 1].id,
        name: sub[sub.length - 1].sub,
      });
    }

    res.status(200).send({
      success: true,
      categoryMain: mainOptionList,
      categorySub: subOptionList,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message:
        "request parameters was wrong. retry request after change parameters",
      err,
    });
  }
};
