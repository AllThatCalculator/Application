const mongoose = require("mongoose");

// 스키마 생성
const RecordSchema = new mongoose.Schema(
  {
    userEmail: String,
    calculetId: Number,
    inputObj: mongoose.Schema.Types.Mixed,
    outputObj: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

// 모델 생성 후 export
module.exports = mongoose.model("Record", RecordSchema);
