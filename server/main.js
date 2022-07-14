const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("this is from backend server");
});

app.listen(port, () => {
  console.log(`listening ${port}`);
});
