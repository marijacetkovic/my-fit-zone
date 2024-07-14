const express= require("express")
const entry = express.Router();
const db = require('../db/conn.js')
const multer = require("multer")
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
  })
  
// configure multer
let upload_dest = multer({ dest: 'uploads/' })

//retrieves all diary entries for a user
entry.get('/', async (req, res, next)=>{
    //should check if users logged in
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "User is not logged in." })
    }
    
    const user_id = req.session.user.user_id;

    try{
        var queryResult = await db.allUserDiaryEntries(user_id);
       
        const formattedResult = queryResult.map(entry => ({
            ...entry,
            diaryDetails: {
                duration: entry.duration,
                cal_burned: entry.cal_burned,
                cal_consumed: entry.cal_consumed,
                hours_slept: entry.hours_slept,
                water_intake: entry.water_intake
            }
        }));

        res.json(formattedResult);
           }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

entry.post('/', upload_dest.single('file'), async (req, res) => {
    console.log("log")
    console.log(req.file)
     if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "User is not logged in." })
    }

    //check if users made the daily post 
    //retreive date of last entry from db

    // checkedIn = new Date();
    // currentDate = new Date();
    // if(checkedIn.day==currentDate.day){
    //     return res.status(400).json({message: 'You have already entered the daily journal entry.'})
    // }
    // //check time if days passed wo entry reset streak

    // if(checkedIn-currentDate>24) currentStreak = 0 

    // //else update streak
    // currentStreak++;
    // if(currentStreak>maxStreak) maxStreak = currentStreak;
    // totalEntries++;
    //save change to db
    
    const { title,duration, cal_burned, cal_consumed, hours_slept, water_intake, workout_id, event_id, description } = JSON.parse(req.body.data);
    const user_id = req.session.user.user_id;
    //var event_id = null;
    const image = req.file;
    const currentDate = new Date();

    const validEntry = duration && cal_burned && cal_consumed && hours_slept && water_intake;
    
    if (validEntry) {
        try {
            var queryResult = await db.addDiaryEntry(title,duration, cal_burned, cal_consumed, 
                hours_slept, water_intake, image.filename, description, workout_id, event_id,
                currentDate, user_id);
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
      const queryResult = await db.deleteDiaryEntry(entry_id, user_id);
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

