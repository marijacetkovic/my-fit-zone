const express = require('express');
const app = express();
require('dotenv').config();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const db = require('./db/conn.js')


const port = 5000;

app.use(cors({
  origin: "http://localhost:3000",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.SECRET));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000000}
}));


// static files
app.use(express.static(path.join(__dirname, 'build')));
app.use('/uploads', express.static('uploads'));

// import routes
const users = require('./routes/users');
const entry = require('./routes/entry');
const workout = require('./routes/workout');
const event = require('./routes/event');
const exercise = require('./routes/exercise');

// use routes
app.use('/users', users);
app.use('/entry', entry);
app.use('/workout', workout);
app.use('/event', event);
app.use('/exercise', exercise);


app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on port: ${process.env.PORT || port}`);
});
