const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mariadb = require("../config/database");

const router = express.Router();
const saltRounds = 10;

/**
 * body에 싸서 온 데이터에 접근하기 위해 필요한 부분
 */
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

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
          pw = hash;

          // 데이터 삽입
          const userInfoData = [
            req.body.id,
            req.body.email,
            req.body.userName,
            req.body.profileImg,
            req.body.bio,
            req.body.sex,
            req.body.birthdate,
            req.body.job,
          ];
          const userLoginData = [req.body.id, pw];

          const userInfoQuery = `INSERT INTO user_info VALUES(?,?,?,?,?,?,?,?);`;
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
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });
});

/**
 * 로그인 요청
 */
router.post("/login", (req, res) => {});

module.exports = router;
