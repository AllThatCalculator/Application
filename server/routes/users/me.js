exports.me = (req, res) => {
  res.status(200).send({ isMe: true, email: req.email });
};
