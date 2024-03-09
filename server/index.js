const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "curd",
});
app.get("/", (req, res) => {
  const sqlInsert =
    "INSERT INTO movie_review(movieName, movieReview) VALUES ('bala', 'goodmovie');";
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
