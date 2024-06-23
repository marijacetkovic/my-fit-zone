const express= require("express");
const users = express.Router();
const { conn, dataPool } = require('../db/conn.js')

users.get('/',(req,res)=>{
    console.log("The route has been reached")
    res.send("users")
    });

module.exports=users
