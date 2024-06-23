const express= require("express")
const workout = express.Router();
const { conn, dataPool } = require('../db/conn.js')

workout.get('/:id', async (req, res, next) => {
    //should get user id from session
    try{
        var queryResult = await dataPool.allUserWorkouts(req.params.id);
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
        var queryResult = await dataPool.deleteWorkout(req.params.id);
        res.json(queryResult);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})

workout.get('/details/:id', async (req, res, next)){
    try{
        var queryResult = await dataPool.getWorkoutExercises(req.params.id);
        res.json(queryResult);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

module.exports=workout
