const express= require("express")
const event = express.Router();
const db = require('../db/conn.js')

event.get('/', async (req, res, next) => {
    //should retreive user id from session
    try{
        var queryResult = await dataPool.allEvents();
        res.json(queryResult);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500); 
    }
});

module.exports=event
