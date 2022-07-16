const express = require("express");
const app = express();

const port = 5000;

const mariadb = require("./config/database");

app.get("/", (req, res) => {
  res.send("this is from backend server");
});

app.get("/calculet/:id", (req, res) => {
  mariadb.connect();
  mariadb.query(
    "select id, title, src_code, manual, description, contributor_id from calculet_info",
    (err, rows, fields) => {
      if (!err) {
        res.send(rows[0]);
      } else {
        console.log(`error:${err}`);
        res.send(err);
      }
    }
  );
  // res.send(`calculet ${req.params.id}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.send("에러");
});

app.listen(port, () => {
  console.log(`listening ${port}`);
});
