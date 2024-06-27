const express= require("express")
const entry = express.Router();
const { conn, dataPool } = require('../db/conn.js')

//retrieves all diary entries for a user
entry.get('/', async (req, res, next)=>{
    //should check if users logged in
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "User is not logged in." })
    }
    
    const user_id = req.session.user.user_id;

    try{
        var queryResult = await dataPool.allUserDiaryEntries(user_id);
        res.json(queryResult);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

entry.post('/', async (req, res) => {

    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "User is not logged in." })
    }
    
    const { duration, cal_burned, cal_consumed, 
            hours_slept, water_intake, workout_id, 
            event_id, description } = req.body;
    const user_id = req.session.user.user_id;
    const image = null; //handle with multer 

    const validEntry = duration && cal_burned && cal_consumed && hours_slept && water_intake;
    
    if (validEntry) {
        try {
            var queryResult = await dataPool.addDiaryEntry(duration, cal_burned, cal_consumed, 
                hours_slept, water_intake, image, description, workout_id, event_id, user_id);
            res.json(queryResult);
        } 
        catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    } else {
        console.log("Incomplete request body");
        res.sendStatus(400);
    }
});

entry.delete('/deleteDiaryEntry/:id', async (req, res) => {
    const entry_id = req.params.id;
  
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "User is not logged in." })
    }
    
    if (!entry_id) {
        return res.status(400).json({ message: "Provide diary entry id." })
    }

    const user_id = req.session.user_id;
  
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

