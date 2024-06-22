const express = require('express');
require('dotenv').config();
const app = express();

const port = 5000;

app.get("/",(req,res)=>{
res.send("hola")
});


//import controllers
const db = require("./db/conn"); 
const users = require("./routes/users")
//Routes
app.use('/users', users);


///app listening on port
app.listen(process.env.PORT || port, ()=>{
console.log(`Server is running on port: ${process.env.PORT || port}`)
});

