exports.me = (req, res) => {
  res.status(200).send({ success: true, userEmail: req.email });
};
