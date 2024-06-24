const express= require("express");
const users = express.Router();
const db = require('../db/conn.js')

users.post('/register', async (req, res, next)=>{
    const {name, surname, email, password} = req.body;
    const role = 'user';
    //must check if email alr exists in db
    if(name && surname && email && password) {
        try{
            var queryResult = await db.addUser(name, surname, role, email, password);
            res.json(queryResult);
            console.log("successful registration");
        }
        catch(err){
            console.log(err);
            console.log("email exists");
            res.sendStatus(400);
        }
    }
    else{
        console.log("Incomplete request body");
    }
});

users.post('/login', async (req, res, next) => {
    const {email, password} = req.body;
    //encrypt passwords?
    if(email && password){
        try{
            var queryResult = await db.authUser(email);
            res.json(queryResult);
            if(queryResult.password === password){
                console.log("successful login");
            }
            req.session.user_id = queryResult.id;
        }
        catch(err){
            console.log(err);
        }
    }
    else{
        console.log("Incomplete request body");
    }
});

users.post('/createprofile', async (req, res, next) => {
    //bmi calculation???
    const {height, weight, cal_intake} = req.body;
    const user_id = req.session.user_id;
    if(!user_id){
        console.log("not logged in");
        res.sendStatus(401);
    }
    if(height && weight){
        try{
            var queryResult = await db.addUserProfile(id, height, weight, cal_intake);
            res.json(queryResult);
        }
        catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    }
    else{
        console.log("Incomplete request body");
        res.sendStatus(400);
    }
});


users.post('/updateprofile', async (req, res, next) => {
    const { height, weight, cal_intake } = req.body;
    const user_id = req.session.user_id;

    if (!user_id) {
        console.log("User not logged in");
        return res.sendStatus(401);
    }

    if (height && weight) {
        try {
            var queryResult = await dataPool.updateUserProfile(user_id, height, weight, cal_intake);
            res.json(queryResult);
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    } else {
        console.log("Incomplete request body");
        res.sendStatus(400);
    }
});

users.post('/logout', async (req, res) => {
    req.session.destroy();
    console.log("session cleared");
    console.log(req.session.user_id);
});
module.exports=users
