const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "cruddatabase",
});

app.get("/", (req, res) => {
  const sqlInsert =
    "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('Inception', 'Good movie');";
  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res
        .status(500)
        .send("An error occurred while inserting into the database.");
        
    } else {
      console.log("1 record inserted");
      res.send("File added successfully.");
    }
  });
});

app.listen(3001, () => {
  console.log("Running on port 3001");
});
