const express = require('express');
const cors = require("cors");
const mysql = require('mysql2');

const app = express();
app.use(express.json());
app.use(cors())


const db = mysql.createConnection({
  socketPath: '/tmp/mysql.sock',
  user: "root",
  password: "Nutellaisgood23#",
  database: "register"

});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }

  console.log('Connected to the database!');
});

// Handle connection errors
db.on('error', (err) => {
  console.error('MySQL Connection Error:', err.message);
});

app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // INSERT query to add a new row into the table
  const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(insertQuery, [username, password], (err, insertResult) => {
    if (err) {
      console.error('Error inserting data:', err.message);
      res.status(500).send({ error: 'Failed to register user' });
    } else {
      console.log('New row added successfully!');
      res.status(200).send({ message: 'User registered successfully!' });
    }
  });
});

app.post('/login', (req,res) =>{
  const username = req.body.username;
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

//setting up the node.js application to listen to port 3001. This means the node.js app will be accessible at localhost:3001
const port = process.env.PORT;
app.listen(3001, () => {
  console.log('Server is running on port');
});