const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mariadb = require("../config/database");
const cookieParser = require("cookie-parser");
const router = express.Router();

// bcrypt 암호화하기 위해 필요한 상수
const saltRounds = 10;

/**
 * body에 싸서 온 데이터에 접근하기 위해 필요한 부분
 */
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(cookieParser());

/**
 * 회원 가입
 */
router.post("/", (req, res) => {
  // 비밀번호 암호화
  let pw = req.body.pw;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (!err) {
      bcrypt.hash(pw, salt, function (err, hash) {
        if (!err) {
          // 암호화된 비밀번호로 저장
          pw = hash;

          // 데이터 삽입
          const userInfoData = [
            req.body.email,
            req.body.userName,
            req.body.profileImg,
            req.body.bio,
            req.body.sex,
            req.body.birthdate,
            req.body.job,
          ];
          const userLoginData = [req.body.email, pw];

          const userInfoQuery = `INSERT INTO user_info VALUES(?,?,?,?,?,?,?);`;
          const userLoginQuery = `INSERT INTO user_login VALUES(?,?);`;

          const sql1 = mariadb.format(userInfoQuery, userInfoData);
          const sql2 = mariadb.format(userLoginQuery, userLoginData);

          mariadb.query(sql1 + sql2, (err, result, fields) => {
            if (!err) {
              res.status(201).send({ location: `/users/${req.body.email}` });
            } else {
              res.status(400).send({
                message:
                  "request parameters was wrong. retry request after change parameters",
                err,
              });
            }
          });
        } else {
          res
            .status(403)
            .send({ success: false, message: "비밀번호 암호화 실패" });
        }
      });
    } else {
      res.status(403).send({ success: false, message: "비밀번호 암호화 실패" });
    }
  });
});

/**
 * 로그인 요청
 */
router.post("/login", (req, res) => {
  // 요청 이메일 DB에서 찾기
  const sql = `select * from user_login where user_email='${req.body.email}'`;

  mariadb.query(sql, async (err, rows, fields) => {
    if (!err) {
      // 계정이 없는 경우
      if (rows.length === 0) {
        return res.status(400).send({
          loginSuccess: false,
          message: "계정을 찾을 수 없습니다.",
        });
      }

      const userLogin = rows[0];

      // 비밀번호 일치하는지 검사
      const isEqualPw = await bcrypt.compare(`${req.body.pw}`, userLogin.pw);

      // 일치하지 않으면
      if (!isEqualPw) {
        return res.status(404).send({
          loginSuccess: false,
          message: "잘못된 비밀번호입니다.",
        });
      }
      // 일치한다면 토큰 생성
      const payload = {
        email: req.body.email,
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        algorithm: "HS256",
        expiresIn: "1h",
      });

      // 토큰을 쿠키에 저장
      res
        .cookie("access_token", token, {
          maxAge: 1000 * 60 * 60,
          httpOnly: true,
        })
        .status(200)
        .send({ loginSuccess: true, userEmail: req.body.email });
    } else {
      res.status(403).send({ success: false, message: "계정 조회 실패" });
    }
  });
});

/**
 * 로그인한 사용자인지 인증 (인가)
 */
router.get("/me", async (req, res) => {
  // 인증 처리하는 부분
  // 클라이언트 쿠키에서 토큰 가져오기
  const token = req.cookies.access_token;

  // 토큰 검증
  try {
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    res.status(200).send({ isMe: true, email: decoded.email });
  } catch {
    res.status(404).send({ isMe: false, message: "로그인 필요" });
  }
});

/**
 * 로그아웃
 */
router.get("/logout", (req, res) => {
  // 클라이언트 쿠키에 있는 토큰 지우기
  res
    .cookie("access_token", "")
    .status(200)
    .send({ success: true, message: "로그아웃 완료" });
});

module.exports = router;
