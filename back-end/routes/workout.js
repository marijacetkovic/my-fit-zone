const express= require("express");
const workout = express.Router();
const db = require('../db/conn.js');

workout.get('/', async (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "User is not logged in." })
    }
    
    const user_id = req.session.user.user_id;

    try{
        var workoutArray = await db.allUserWorkouts(user_id);
        var userWorkouts = [];
        for (var workout of workoutArray){
            var queryResult = await db.getWorkoutExercises(workout.id);
            var singleUserWorkout = {workout, exercises: queryResult};
            userWorkouts.push(singleUserWorkout);
        }
        res.json(userWorkouts);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})
workout.post('/', async (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "User is not logged in." })
    }
    const {name, exercises} = req.body;
    const user_id = req.session.user.user_id;
    if(!name || exercises.length<1){
       return res.status(400).json({ message: 'Incomplete request body.' });
    }
    try{
        const queryResultWorkout = await db.addWorkout2(name, user_id, exercises);
        //const workout_id = queryResultWorkout.insertId;
        
        console.log(queryResultWorkout)
        //workout_id: workout_id, 
        res.status(201).json({message: 'Workout and exercises added successfully.' });
    }
    catch(err){
        console.log(err)
        res.sendStatus(500);
    }

})

workout.delete('/:id', async (req, res, next) => {
    const workout_id = req.params.id;
    if(!workout_id){
        return res.status(400).json({ message: "Bad request." })
    }
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "User is not logged in." })
    }
    
    const user_id = req.session.user.user_id;
    //here id is workout id
    try{
        var queryResult = await db.deleteWorkout(workout_id, user_id);
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
        var wkResult = await db.getIndividualWk(req.params.id);
        var queryResult = await db.getWorkoutExercises(req.params.id);
        res.json({
            workout:wkResult[0],
            exercises:queryResult
        });
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})

module.exports=workout
