const express= require("express")
const event = express.Router();
const { conn, dataPool } = require('../db/conn.js')

event.get('/', async (req, res, next) => {
    try{
        var queryResult = await dataPool.allEvents();
        res.json(queryResult);
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500); 
    }
});

event.get('/events/:id', async (req, res) => {
    const eventId = req.params.id;
    try {
      const queryResult = await dataPool.getEventById(eventId);
    //   if (!event || event.length === 0) {
    //     return res.sendStatus(404);
    //   }
      res.json(queryResult);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
});

event.get('/my', async (req, res) => {
    const user_id = req.session.user.user_id;

    if(!user_id){
        console.log("not logged in");
        return res.sendStatus(401);
    }

    try {
      const queryResult = await dataPool.getEventsForUser(userId);
      res.json(queryResult); 
    } catch (err) {
      console.error(err);
      res.sendStatus(500); 
    }
  });

event.post('/', async (req, res, next) => {
    //only admins should post events
    const { name, time, location, organization, description } = req.body;
    const { role } = req.session.user;

    if(role !== 'admin'){
        console.log("not allowed");
        return res.sendStatus(403);
    }

    if (name && time && location && organization){
        try{
            var queryResult = await dataPool.addEvent(name,time,location,organization,description);
            if (queryResult.affectedRows === 0) {
                console.log("unsuccessful event insert");
                return res.sendStatus(404); // unsuccessful
            }
            res.json(queryResult);
            res.sendStatus(200);
        }
        catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    }
    else{
        console.log("Incomplete request body.");
        res.sendStatus(400);
    }

})

event.post('signup', async (req, res, next) => {
    const event_id = req.body.event_id;
    const user_id = req.session.user.user_id;

    if(!user_id){
        console.log("not logged in");
        return res.sendStatus(401);
    }

    if (event_id){
        try{
            var queryResult = await dataPool.addEventSignUp(event_id,user_id);
            if (queryResult.affectedRows === 0) {
                console.log("unsuccessful sign up");
                return res.sendStatus(404); // unsuccessful
            }
            res.json(queryResult);
            res.sendStatus(200);
        }
        catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    }
    else{
        console.log("Incomplete request body.");
        res.sendStatus(400);
    }
})

event.delete('signup', async (req, res, next) => {
    const event_id = req.body.event_id;
    const user_id = req.session.user.user_id;

    if(!user_id){
        console.log("not logged in");
        return res.sendStatus(401);
    }

    if (event_id){
        try{
            var queryResult = await dataPool.removeEventSignUp(event_id,user_id);
            if (queryResult.affectedRows === 0) {
                console.log("unsuccessful sign up delete");
                return res.sendStatus(404); // unsuccessful
            }
            res.json(queryResult);
            res.sendStatus(200);
        }
        catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    }
    else{
        console.log("Incomplete request body.");
        res.sendStatus(400);
    }
})

module.exports=event
