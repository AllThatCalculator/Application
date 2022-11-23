const mariadb = require("../config/database");

exports.findUser = async (req, res, next) => {
  // 클라이언트 정보에서 유저 id 저장
  const id = req.body.id;

  // DB에서 계정 조회
  const sql = `select id from user_info where id='${id}'`;
  try {
    const rows = await mariadb.query(sql);

    if (rows[0].length === 0) {
      // 계정이 없는 경우
      req.exist = false;
    } else {
      // 계정이 있는 경우
      req.exist = true;
    }

    // 계정 유무 정보 request에 저장해서 다음으로 넘어감
    next();
  } catch (err) {
    res.status(400).send({
      success: false,
      message:
        "request parameters was wrong. retry request after change parameters",
      err,
    });
  }
};
