const express = require("express");
const users = require("./routes/users");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("this is from backend server");
});

app.use("/users", users);

app.listen(port, () => {
  console.log(`listening ${port}`);
});
