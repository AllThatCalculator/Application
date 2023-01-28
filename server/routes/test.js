const express = require("express");
const router = express.Router();
const { models } = require("../models");

/**
 * @swagger
 *  /api/test/update-log:
 *    post:
 *      tags: [TEST]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/updateLog"
 *      responses:
 *        200:
 *          description: 등록 성공
 */
router.post("/update-log", async (req, res) => {
  await models.calculetUpdateLog.create(
    {
      message: req.body.message,
      calculet_id: req.body.calculetId,
    },
    { silent: true }
  );
  res.status(200).send();
});

module.exports = router;
