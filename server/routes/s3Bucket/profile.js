const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = require("../../config/s3Bucket");
const { v4: uuidv4 } = require("uuid");

/**
 * s3버킷에 프로필 사진 올리는 미들웨어 + 에러처리 포함
 */
async function postProfile(req, res, next) {
  if (req.file) {
    if (
      req.file.mimetype !== "image/png" &&
      req.file.mimetype !== "image/jpeg"
    ) {
      res.status(400).send({
        success: false,
        code: 1,
        message: "image type is wrong",
      });
      return;
    }

    const result = await putObjectToS3(req.file);

    if (result.code == 200) {
      res.locals.profileUUID = result.uuid;
    } else {
      res.status(400).send({
        success: false,
        code: 2,
        message: "upload failed",
      });
      return;
    }
  } else {
    // no profileImage
    res.locals.profileUUID = null;
  }
  next();
}

/**
 * S3 bucket에 프로필 이미지 업로드
 * @param {Blob} profileImg
 * @returns uuid for profile image
 */
async function putObjectToS3(profileImg) {
  // generate uuid for profile image
  const newUUID = uuidv4().replace(/-/g, "");

  // send PUT command to S3 bucket
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `profile/${newUUID}`,
    Body: profileImg.buffer,
    ContentType: profileImg.mimetype,
  };
  const command = new PutObjectCommand(params);

  try {
    const response = await s3Client.send(command);
    return {
      code: response.$metadata.httpStatusCode,
      uuid: newUUID,
    };
  } catch (error) {
    return {
      code: 400,
      uuid: null,
    };
  }
}

module.exports = { postProfile };
