const express = require("express");
const { models } = require("../../models");
const { errorHandler } = require("../../middleware/errorHandler");
const { getCategory } = require("./getCategory");
const router = express.Router();

/**
 * @swagger
 *  /api/category:
 *    get:
 *      tags: [category]
 *      summary: 카테고리 목록 불러오기
 *      description: 카테고리 목록 불러오기
 *      responses:
 *        200:
 *          description: 카테고리 목록 반환
 *        400:
 *          $ref: "#/components/responses/error"
 */
router.get("/", errorHandler.dbWrapper(getCategory));

module.exports = router;
