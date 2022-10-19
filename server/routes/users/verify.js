exports.verify = async (req, res) => {
  if (req.exit) {
    // 계정 존재
    res.status(200).send({
      success: true,
      message: "계정 존재",
    });
  } else {
    // 계정 존재 x
    res.status(404).send({
      success: false,
      message: "계정 존재하지 않음",
    });
  }
};
