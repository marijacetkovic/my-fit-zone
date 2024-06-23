const express= require("express")
const entry = express.Router();
const { conn, dataPool } = require('../db/conn.js')

//retrieves all diary entries for a user
entry.get('/:id', async (req, res, next)=>{
    //should check if users logged in
    //should retrieve user id from session
    try{
        var queryResult = await dataPool.allUserDiaryEntries(req.params.id);
        res.json(queryResult);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})


module.exports=entry

