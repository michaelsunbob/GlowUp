const express = require('express');
const cors = require("cors");
const mysql = require('mysql');

const app = express();
app.use(express.json());
app.use(cors())


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "register",

});


app.post('/register', (req,res) =>{
  const usernname = req.body.username;
  const password = req.body.password;

  db.query('INSERT INTO users (username, password VALUES (?, ?)', [username, password], (err, res) => {
    console.log(err);
  })
})

app.post('/login', (req,res) =>{
  const usernname = req.body.username;
  const password = req.body.password;

  db.query('SELECT * FROM users WHERE username = ? AND password = ?', 
  [username, password], (err, res) => {
    if(err){
      res.send({err: err })
    }
    if(res.length > 0){
        res.send(res)
    }else{
      res.send({message: "Wrong username or password!"})
    }    
  })
})


const port = process.env.PORT;
app.listen(3001, () => {
  console.log('Server is running on port');
});