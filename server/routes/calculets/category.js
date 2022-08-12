const mariadb = require("../../config/database");

exports.category = async (req, res) => {
  // 카테고리 대분류
  const categoryMainQuery = `select * from category_main where id < 99999 order by id;`;

  // 카테고리 소분류
  const categorySubQuery = `select * from category_sub order by id;`;

  try {
    const rows = await mariadb.query(categoryMainQuery + categorySubQuery);
    const categoryMain = rows[0][0];
    const categorySub = rows[0][1];

    res.status(200).send({
      success: true,
      categoryMain: categoryMain,
      categorySub: categorySub,
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
