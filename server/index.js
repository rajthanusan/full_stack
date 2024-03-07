const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "stock",
});

app.get("/", (req, res) => {
  const sqlInsert =
    "INSERT INTO item (item_id, item_name, quantity, price) VALUES ('I002', 'powder', 4, 200);";
  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
      return res.send("An error occurred while inserting data.");
    }
    console.log("Data inserted successfully.");
    res.send("Data inserted successfully.");
  });
});

app.listen(3001, () => {
  console.log("Running on port 3001");
});
