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

app.listen(3001, () => {
  console.log("Running on port 3001");
});
