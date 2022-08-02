db.createUser({
  user: "atcRW",
  pwd: "readwrite", // 임시 비밀번호
  roles: [
    {
      role: "readWrite",
      db: "ATC_DB",
    },
  ],
});
