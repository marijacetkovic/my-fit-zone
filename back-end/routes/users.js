const express= require("express");
const users = express.Router();
const db = require('../db/conn.js')

users.post('/register', async (req, res, next) => {
    const {name, surname, email, password} = req.body;
    const role = 'user'; //superadmin will be hardcoded

    //must check if email alr exists in db
    if(name && surname && email && password) {
        try{
            var queryResult = await db.addUser(name, surname, role, email, password);
            if (queryResult.affectedRows === 0) {
                console.log("unsuccessful registration");
                return res.sendStatus(404); // unsuccessful
            }
            res.json(queryResult);
            console.log("successful registration");
            res.sendStatus(200);
        }
        catch(err){
            console.log(err);
            res.sendStatus(400);
        }
    }
    else{
        console.log("Incomplete request body");
        res.sendStatus(400);
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
            req.session.user.user_id = queryResult.id;
        }
        catch(err){
            console.log(err);
        }
    }
    else{
        console.log("Incomplete request body");
    }
});

users.put('/assignadmin', async (req, res, next) => {
    const role = req.session.user.role;
    const { id } = req.body;

    if (!id) {
      console.log("User id not provided");
      return res.sendStatus(400); // bad request
    }

    if(role === 'admin'){
        try{
            var queryResult = await db.assignAdmin(id);
            if (queryResult.affectedRows === 0) {
                console.log("unsuccessful admin assignment");
                return res.sendStatus(404); // unsuccessful
            }
            console.log(queryResult);
            res.sendStatus(200);
        }
        catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    }
    else{
        console.log("Forbidden");
        res.sendStatus(403);
    }
    
})

users.post('/createprofile', async (req, res, next) => {
    //bmi calculation???
    const {height, weight, cal_intake} = req.body;
    const bmi = bmi(height, weight);
    const user_id = req.session.user.user_id;

    if(!user_id){
        console.log("not logged in");
        return res.sendStatus(401);
    }

    if(height && weight){
        try{
            var queryResult = await db.addUserProfile(id, height, weight, cal_intake);
            if (queryResult.affectedRows === 0) {
                console.log("unsuccessful user profile creation");
                return res.sendStatus(404); // unsuccessful
            }
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
    const user_id = req.session.user.user_id;

    if (!user_id) {
        console.log("User not logged in");
        return res.sendStatus(401);
    }

    if (height && weight) {
        try {
            var queryResult = await dataPool.updateUserProfile(user_id, height, weight, cal_intake);
            if (queryResult.affectedRows === 0) {
                console.log("unsuccessful user profile update");
                return res.sendStatus(404); // unsuccessful
            }
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
    try{
        req.session.destroy();
        console.log("session cleared");
        console.log(req.session.user_id);
        res.sendStatus(200);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

//helper functions

const bmi = (height, weight) => {
    // height in meters, weight in kilograms
    return weight / (height * height);
}

//define functions for password encryption and possibly email validation
module.exports=users
