const express= require("express")
const exercise = express.Router();
const db = require('../db/conn.js')

exercise.get('/:id', async (req, res, next)=>{
    //check if users logged in
    let logged = true
    if (logged){
        try {
            //user id if logged in, displays personal exercises as well
            var queryResult = await dataPool.allExercises(id); 
            res.json(queryResult);
          } catch (err) {
            console.log(err);
            res.sendStatus(500); 
          }
    }
    else{
        try {
            //if not logged in only default exercises
            var queryResult = await dataPool.allExercises(-1); 
            res.json(queryResult);
          } catch (err) {
            console.log(err);
            res.sendStatus(500); 
          }
    }

})

exercise.get('/favorite/:id', async (req, res, next) => {
    //should retreive user id from session
    // check if req body is complete
    if (user_id) {
        try{
            var queryResult = await dataPool.getUserFavoriteExercises(id);
            res.json(queryResult);
        }
        catch (err) {
            console.log('Error favoriting exercise:', err);
            res.sendStatus(500); 
        }
    }
});

exercise.post('/favorite', async (req, res, next) => {
    let user_id = req.body.user_id;
    let exercise_id = req.body.exercise_id;

    // check if req body is complete
    if (user_id && exercise_id) {
        try{
            var queryResult = await dataPool.addFavoriteExercise(user_id, exercise_id);
            res.json(queryResult);
        }
        catch (err) {
            console.log('Error favoriting exercise:', err);
            res.sendStatus(500); 
        }
    }
});

exercise.delete('/favorite', async (req, res, next) => {
    let user_id = req.body.user_id;
    let exercise_id = req.body.exercise_id;

    // check if req body is complete
    if (user_id && exercise_id) {
        try{
            var queryResult = await dataPool.removeFavoriteExercise(user_id, exercise_id);
            res.json(queryResult);
        }
        catch (err) {
            console.log('Error favoriting exercise:', err);
            res.sendStatus(500); 
        }
    }
});

module.exports=exercise
