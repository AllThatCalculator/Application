async function postCalculets(req, res) {
  // 데이터 생성
  await models.calculetInfoTemp.create({
    title: req.body.title,
    src_code: req.body.srcCode,
    manual: req.body.manual,
    description: req.body.description,
    category_main_id: req.body.categoryMainId,
    category_sub_id: req.body.categorySubId,
    contributor_id: res.locals.userId,
  });

  res.status(301).send({
    url: "/",
  });
}

exports = { postCalculets };
