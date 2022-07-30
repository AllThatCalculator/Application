exports.logout = (req, res) => {
  // 클라이언트 쿠키에 있는 토큰 지우기
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  return res.status(200).redirect("/");
};
