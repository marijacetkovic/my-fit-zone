const express= require("express");
const users = express.Router();

users.get('/',(req,res)=>{
    console.log("The route has been reached")
    res.send("users")
    });

module.exports=users
