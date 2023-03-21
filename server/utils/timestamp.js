exports.timestamp = () =>
  new Date().toLocaleString("en-US", {
    timeZone: "Asia/Seoul",
  });
