const mariadb = require("../../config/database");

exports.signUp = async (req, res) => {
  // 프로필 이미지 blob으로 변경
  // 프론트엔드에서 전달받은 base64String
  let base64String = req.body.profileImg;
  // blob으로 변경해서 저장할 변수
  let blobImage = null;
  // 기본 이미지가 아닌 경우에만 blob으로 decode
  if (base64String !== "/img/defaultProfile.png") {
    blobImage = base64String.split(";base64,").pop();
    blobImage = Buffer.from(blobImage, "base64");
  }

  // 데이터 삽입
  const userInfoData = [
    req.body.id,
    req.body.email,
    req.body.userName,
    blobImage,
    req.body.bio,
    req.body.sex,
    req.body.birthdate,
    req.body.job,
  ];

  const userInfoQuery = `INSERT INTO user_info VALUES(?,?,?,?,?,?,?,?);`;

  const sql1 = mariadb.format(userInfoQuery, userInfoData);

  try {
    await mariadb.query(sql1);
    console.log("success sign up");
    res.status(201).send({
      success: true,
      message: "회원가입 완료",
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
