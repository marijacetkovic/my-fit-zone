const express= require("express");
const workout = express.Router();
const db = require('../db/conn.js');

workout.get('/:id', async (req, res, next) => {
    //should get user id from session
    try{
        var queryResult = await db.allUserWorkouts(req.params.id);
        res.json(queryResult);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})

workout.delete('/:id', async (req, res, next) => {
    //here id is workout id
    try{
        var queryResult = await db.deleteWorkout(req.params.id);
        res.json(queryResult);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})

workout.get('/details/:id', async (req, res, next) => {
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
