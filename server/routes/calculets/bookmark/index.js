const express = require("express");
const { auth } = require("../../../middleware/auth");
const { errorHandler } = require("../../../middleware/errorHandler");
const { userBookmark } = require("./userBookmark");
const router = express.Router();
/**
 * @swagger
 *  /api/calculets/bookmark:
 *    get:
 *      tags: [bookmark]
 *      summary: 북마크 목록 불러오기 <Auth>
 *      description: 로그인한 유저에 대해 북마크 목록 불러오기
 *      responses:
 *        200:
 *          $ref: "#/components/responses/bookMarkList"
 */
router.get(
  "/bookmark",
  [auth.firebase, auth.database],
  errorHandler.dbWrapper(userBookmark.list)
);

/**
 * @swagger
 *  /api/calculets/bookmark/{calculetId}:
 *    put:
 *      parameters:
 *        - $ref: "#/components/parameters/calculetId"
 *      tags: [bookmark]
 *      summary: 북마크 등록 <Auth>
 *      description: 로그인한 유저에 대해 계산기 "북마크" 등록
 *      responses:
 *        200:
 *          $ref: "#/components/responses/bookmarkResult"
 *        400:
 *          $ref: "#/components/responses/bookmarkResult"
 */
router.put(
  "/bookmark/:calculetId",
  [auth.firebase, auth.database],
  errorHandler.dbWrapper(userBookmark.mark)
);

/**
 * @swagger
 *  /api/calculets/removeBookmark/{calculetId}:
 *    put:
 *      parameters:
 *        - $ref: "#/components/parameters/calculetId"
 *      tags: [bookmark]
 *      summary: 북마크 취소 <Auth>
 *      description: 로그인한 유저에 대해 계산기 "북마크" 취소
 *      responses:
 *        200:
 *          $ref: "#/components/responses/bookmarkResult"
 *        400:
 *          $ref: "#/components/responses/bookmarkResult"
 */
router.put(
  "/removeBookmark/:calculetId",
  [auth.firebase, auth.database],
  errorHandler.dbWrapper(userBookmark.remove)
);
module.exports = router;
