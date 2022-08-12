const express = require("express");
const { auth } = require("../middleware/auth");
const { findUser } = require("../middleware/findUser");
const { signUp } = require("./users/signUp");
const { login } = require("./users/login");
const { me } = require("./users/me");
const { logout } = require("./users/logout");
const { refresh } = require("./users/refresh");

const router = express.Router();

/**
 * body에 싸서 온 데이터에 접근하기 위해 필요한 부분
 */
router.use(express.urlencoded({ limit: "1mb", extended: true }));
router.use(express.json({ limit: "1mb" }));
router.use(cookieParser());

/**
 * 회원 가입
 */
router.post("/", findUser, signUp);

/**
 * 로그인 요청
 */
router.post("/login", login);

/**
 * 로그인한 사용자인지 인증 (인가)
 */
router.get("/me", auth, me);

/**
 * 로그아웃
 */
router.get("/logout", logout);

/**
 * refresh token을 통해 access token 재발급하는 모듈 (현재는 쓰고 있지 않음)
 */
router.get("/refresh", refresh);

module.exports = router;
