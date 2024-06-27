const express= require("express");
const workout = express.Router();
const db = require('../db/conn.js');

workout.get('/', async (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "User is not logged in." })
    }
    
    const user_id = req.session.user.user_id;

    try{
        var queryResult = await db.allUserWorkouts(user_id);
        res.json(queryResult);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})

workout.delete('/:id', async (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "User is not logged in." })
    }
    
    const user_id = req.session.user.user_id;
    //here id is workout id
    try{
        var queryResult = await db.deleteWorkout(req.params.id, user_id);
        if (queryResult.affectedRows === 0) {
            console.log("unsuccessful workout deletion");
            return res.sendStatus(404); // unsuccessful
        }
        res.json(queryResult);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})

workout.get('/details/:id', async (req, res, next) => {

    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "User is not logged in." })
    }
    
    const user_id = req.session.user.user_id;

    try{
        var queryResult = await db.getWorkoutExercises(req.params.id);
        res.json(queryResult);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})

module.exports=workout
