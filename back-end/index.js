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
const entry = require("./routes/entry")
const workout = require("./routes/workout")
const event = require("./routes/event")
const exercise = require("./routes/exercise")
//Routes
app.use('/users', users);
app.use('/entry', entry);
app.use('/workout', workout);
app.use('/event', event);
app.use('/exercise', exercise);


///app listening on port
app.listen(process.env.PORT || port, ()=>{
console.log(`Server is running on port: ${process.env.PORT || port}`)
});

