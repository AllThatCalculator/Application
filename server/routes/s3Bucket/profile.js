const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = require("../../config/s3Bucket");
const { v4: uuidv4 } = require("uuid");
const { models } = require("../../models");

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

    if (result.code === 200) {
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

/**
 * s3버킷에 프로필 사진 삭제하는 미들웨어 + 에러처리 포함
 */
async function deleteProfile(req, res, next) {
  const user = await models.userInfo.findByPk(res.locals.userId, {
    attributes: ["profile_img"],
  });

  // if exist profile img -> delete
  if (req.file && user.profile_img) {
    const result = await deleteObjectFromS3(user.profile_img);

    if (result.code !== 204) {
      res.status(400).send({
        success: false,
        code: 2,
        message: "delete failed",
      });
      return;
    }
  }
  next();
}

/**
 * S3 bucket에 프로필 이미지 삭제
 * @param {String} profileImgUUID
 */
async function deleteObjectFromS3(profileImgUUID) {
  // send DELETE command to S3 bucket
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `profile/${profileImgUUID}`,
  };
  const command = new DeleteObjectCommand(params);

  try {
    const response = await s3Client.send(command);
    return {
      code: response.$metadata.httpStatusCode,
      uuid: profileImgUUID,
    };
  } catch (error) {
    console.error(error);
    return {
      code: 400,
      uuid: null,
    };
  }
}

module.exports = { postProfile, deleteProfile };
