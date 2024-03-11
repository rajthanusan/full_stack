const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "curd",
});
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get("/api/get", (req,res)=>{

  const sqlInsert =
    "SELECT * FROM movie_review";
  db.query(sqlInsert, (err, result) => {
    res.send(result)
  })

})

app.post("/api/insert", (req, res) => {

  const movieName=req.body.movieName
  const movieReview=req.body.movieReview



  const sqlInsert =
    "INSERT INTO movie_review(movieName, movieReview) VALUES (?, ?)";
  db.query(sqlInsert, [movieName,movieReview], (err, result) => {
    console.log(result)
    
  });
});

app.delete('/api/delete/:movieName', (req, res) => {
  const name = req.params.movieName; // Use req.params.movieName to get the movieName
  const sqlDelete = "DELETE FROM movie_review WHERE movieName=?";

  db.query(sqlDelete, name, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result); // Optionally, send a response back to the client
  });
});

app.put("/api/update", (req, res) => {
  const name = req.body.movieName;
  const review= req.body.movieReview; // Assuming the new review is sent in the request body

  const sqlUpdate = "UPDATE movie_review SET movieReview = ? WHERE movieName = ?";
  db.query(sqlUpdate, [review, name], (err, result) => {
    if (err) {
      console.error("Error updating movie review:", err);
      res.status(500).send("Error updating movie review");
    } else {
      res.status(200).send("Movie review updated successfully");
    }
  });
});





app.listen(3001, () => {
  console.log("Running on port 3001");
});
