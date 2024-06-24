const express= require("express")
const entry = express.Router();
const { conn, dataPool } = require('../db/conn.js')

//retrieves all diary entries for a user
entry.get('/', async (req, res, next)=>{
    //should check if users logged in
    const user_id = req.session.user_id;
    if(!user_id){
        res.sendStatus(401); //unauthorized
    }
    try{
        var queryResult = await dataPool.allUserDiaryEntries(user_id);
        res.json(queryResult);
        res.sendStatus(200);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

entry.post('/', async (req, res) => {
    const { duration, cal_burned, cal_consumed, hours_slept, water_intake } = req.body;
    const user_id = req.session.user_id;
    const image = null; //handle with multer 

    if (!user_id) {
        console.log("user not logged in");
        return res.sendStatus(401);
    }

    if (duration && cal_burned && cal_consumed && hours_slept && water_intake) {
        try {
        var queryResult = await dataPool.addDiaryEntry(duration, cal_burned, cal_consumed, hours_slept, water_intake, image, user_id);
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

users.delete('/deleteDiaryEntry/:id', async (req, res) => {
    const user_id = req.session.user_id;
    const entry_id = req.params.id;
  
    if (!user_id) {
      console.log("user not logged in");
      return res.sendStatus(401);
    }
  
    if (!entry_id) {
      console.log("provide diary entry");
      return res.sendStatus(400);
    }
  
    try {
      const queryResult = await dataPool.deleteDiaryEntry(entry_id, user_id);
      if (queryResult.affectedRows === 0) {
        console.log("Diary entry not found or not allowed to delete");
        return res.sendStatus(404); // Not Found
      }
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500); 
    }
});



module.exports=entry

