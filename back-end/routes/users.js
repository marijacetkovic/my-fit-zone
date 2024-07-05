const express= require("express");
const users = express.Router();
const db = require('../db/conn.js')
const multer = require('multer');




const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
  })
  
// Configure Multer,
let upload_dest = multer({ dest: 'uploads/' })


users.post('/register', async (req, res, next) => {
    const {name, surname, email, password} = req.body;
    const role = 'user'; //superadmin will be hardcoded
    console.log(name)
    console.log(surname)
    console.log(email)
    console.log(password)
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
            //res.sendStatus(200);
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
    //shouldnt be able to login twice
    if(email && password){
        try{
            var queryResult = await db.authUser(email);
            if(queryResult.length>0){
                var user = queryResult[0];
                if(user.password === password){
                    console.log("successful login");
                    req.session.user = {
                        user_id: user.id,
                        role: user.role 
                    };
                    console.log(req.session)
                    res.json(queryResult);
                }
            }
            else return res.sendStatus(500);
        }
        catch(err){
            console.log(err);
            return res.sendStatus(500);
        }
    }
    else{
        return res.status(400).json({ message: "Incomplete request body."});
    }
});

users.get('/session', async (req, res, next) => {
    try {
        console.log(req.sessionID)
        console.log(req.session.user)
        res.json(req.session)
    } catch (error) {
        res.sendStatus(500)
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
users.get('/profile', async (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "User not logged in" })
    }
    
    const user_id = req.session.user.user_id;

    try{
        var queryResult = await db.getUserProfile(user_id);
        res.json(queryResult);
    }
    catch (err) {
        console.log('Error favoriting exercise:', err);
        res.sendStatus(500); 
    }
})

users.post('/profile', upload_dest.single('file'), async (req, res, next) => {
    //bmi calculation???
    const {height, weight, cal_intake} = req.body;
    const bmi = bmiCalc(height, weight);
    const img = req.file;
    
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "User not logged in" })
    }
    
    const user_id = req.session.user.user_id;
    const max_streak = 0;
    const current_streak = 0;
    const total_entries = 0;

    if(height && weight){
        try{
            var queryResult = await db.addUserProfile(user_id, height, weight, 
                cal_intake, img, 
                current_streak, max_streak, total_entries);
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


users.put('/profile', async (req, res, next) => {
    const { height, weight, cal_intake } = req.body;
    
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "User is not logged in." })
    }
    
    const user_id = req.session.user.user_id;

    if (height && weight) {
        try {
            var queryResult = await db.updateUserProfile(user_id, height, weight, cal_intake);
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
        //console.log(req.session.user.user_id);
        req.session.destroy();
        console.log("session cleared");
        res.sendStatus(200);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

users.get('/', async (req, res, next)=>{
    try {
        var queryResult = await db.allUsers();
        console.log(queryResult)
        res.json(queryResult);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

//helper functions

const bmiCalc = (height, weight) => {
    // height in meters, weight in kilograms
    return weight / (height * height);
}

//define functions for password encryption and possibly email validation
module.exports=users
