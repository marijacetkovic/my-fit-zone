const express= require("express")
const event = express.Router();
const { conn, dataPool } = require('../db/conn.js')

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

event.post('/', async (req, res, next) => {
    //only admins should post events
    let name = req.body.name;
    let time = req.body.time;
    let location = req.body.location;
    let organization = req.body.organization;
    let description = req.body.description;

    if (name && time && location && organization){
        try{
            var queryResult = await dataPool.addEvent(name,time,location,organization,description);
            res.json(queryResult);
        }
        catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    }
    else{
        console.log("Incomplete request body.");
    }

})

event.post('signup', async (req, res, next) => {
    let user_id = req.body.user_id;
    let event_id = req.body.event_id;

    if (user_id && event_id){
        try{
            var queryResult = await dataPool.addEventSignUp(event_id,user_id);
            res.json(queryResult);
        }
        catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    }
    else{
        console.log("Incomplete request body.");
    }
})

event.delete('signup', async (req, res, next) => {
    let user_id = req.body.user_id;
    let event_id = req.body.event_id;

    if (user_id && event_id){
        try{
            var queryResult = await dataPool.removeEventSignUp(event_id,user_id);
            res.json(queryResult);
        }
        catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    }
    else{
        console.log("Incomplete request body.");
    }
})

module.exports=event
