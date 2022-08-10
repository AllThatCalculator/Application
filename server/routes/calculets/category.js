const mariadb = require("../../config/database");

exports.category = (req, res) => {
  // 카테고리 대분류
  const categoryMainQuery = `select * from category_main;`;

  // 카테고리 소분류
  const categorySubQuery = `select * from category_sub;`;

  mariadb.query(categoryMainQuery + categorySubQuery, (err, rows, fields) => {
    if (!err) {
      const categoryMain = rows[0];
      const categorySub = rows[1];

      res.status(200).send({
        success: true,
        categoryMain: categoryMain,
        categorySub: categorySub,
      });
    } else {
      res.status(400).send({
        success: false,
        message:
          "request parameters was wrong. retry request after change parameters",
        err,
      });
    }
  });
};
