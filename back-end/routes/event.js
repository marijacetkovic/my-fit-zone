const express= require("express")
const event = express.Router();
const db = require('../db/conn.js')

event.get('/', async (req, res, next) => {
    const eventId = req.query.id;
    if(eventId){
        try {
            const queryResult = await db.getEventById(eventId);
          //   if (!event || event.length === 0) {
          //     return res.sendStatus(404);
          //   }
            res.json(queryResult);
          } catch (err) {
            console.error(err);
            res.sendStatus(500);
          }
    } 
    else{
        try{
            var queryResult = await db.allEvents();
            res.json(queryResult);
        }
        catch (err) {
            console.log(err);
            res.sendStatus(500); 
        }
    }
});

event.post('/', async (req, res, next) => {
    //only admins should post events
    const { name, time, location, organization, description } = req.body;

    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "User is not logged in." })
    }
    
    const { user_id, role }  = req.session.user;
   
    if(role !== 'admin'){
        return res.status(403).json({ message: "User is not authorized." })
    }

    if (name && time && location && organization){
        try{
            var queryResult = await db.addEvent(name,time,location,organization,description,user_id);
            if (queryResult.affectedRows === 0) {
                console.log("unsuccessful event insert");
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
        console.log("Incomplete request body.");
        res.sendStatus(400);
    }

})

event.get('/signup', async (req, res, next) => {
    console.log("HEREEES")
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "User is not logged in." })
    }
    
    const user_id = req.session.user.user_id;
    console.log("retreiving for"+user_id)

    try {
      const queryResult = await db.getEventsForUser(user_id);
      res.json(queryResult); 
    } catch (err) {
      console.error(err);
      res.sendStatus(500); 
    }
});

event.post('/signup', async (req, res, next) => {
    const event_id = req.body.event_id;

    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "User is not logged in." })
    }
    
    const user_id = req.session.user.user_id;

    if (event_id){
        try{
            var queryResult = await db.addEventSignUp(event_id,user_id);
            if (queryResult.affectedRows === 0) {
                console.log("unsuccessful sign up");
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
        console.log("Incomplete request body.");
        res.sendStatus(400);
    }
})

event.delete('/signup', async (req, res, next) => {
    const event_id = req.body.event_id;

    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "User is not logged in." })
    }
    
    const user_id = req.session.user.user_id;

    if (event_id){
        try{
            var queryResult = await db.removeEventSignUp(event_id,user_id);
            if (queryResult.affectedRows === 0) {
                console.log("unsuccessful sign up delete");
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
        console.log("Incomplete request body.");
        res.sendStatus(400);
    }
})

module.exports=event
