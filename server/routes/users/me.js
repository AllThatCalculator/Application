exports.me = (req, res) => {
  res.status(200).send({ success: true, data: { email: req.email } });
};
