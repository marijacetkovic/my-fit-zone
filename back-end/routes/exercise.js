const express = require("express");
const exercise = express.Router();
const db = require('../db/conn.js');

exercise.get('/', async (req, res, next)=>{
    //check if users logged in
    const user_id = req.session.user.user_id;

    if(!user_id){
        console.log("not logged in");
        try {
            //if not logged in only default exercises
            var queryResult = await db.allExercises(-1); 
            res.json(queryResult);
            res.sendStatus(200);
          } catch (err) {
            console.log(err);
            res.sendStatus(500); 
          }
    }
    else{     
        try {
            //user id if logged in, displays personal exercises as well
            var queryResult = await db.allExercises(user_id); 
            res.json(queryResult);
            res.sendStatus(200);
          } catch (err) {
            console.log(err);
            res.sendStatus(500); 
          }
    }
})

exercise.get('/favorite/:id', async (req, res, next) => {
    //should retreive user id from session
    // check if req body is complete
    const user_id = req.session.user_id;
    if(!user_id){
        res.sendStatus(401); //unauthorized
    }
    try{
        var queryResult = await db.getUserFavoriteExercises(id);
        res.json(queryResult);
    }
    catch (err) {
        console.log('Error favoriting exercise:', err);
        res.sendStatus(500); 
    }

});

exercise.post('/favorite', async (req, res, next) => {
    const exercise_id = req.body.exercise_id;
    const user_id = req.session.user.user_id;

    if(!user_id){
        console.log("not logged in");
        return res.sendStatus(401);
    }

    // check if req body is complete
    if (user_id && exercise_id) {
        try{
            var queryResult = await db.addFavoriteExercise(user_id, exercise_id);
            if (queryResult.affectedRows === 0) {
                console.log("unsuccessful favorite");
                return res.sendStatus(404); // unsuccessful
            }
            res.json(queryResult);
            res.sendStatus(200);
        }
        catch (err) {
            console.log('Error favoriting exercise:', err);
            res.sendStatus(500); 
        }
    }
});

exercise.delete('/favorite', async (req, res, next) => {
    const exercise_id = req.body.exercise_id;
    const user_id = req.session.user.user_id;

    if(!user_id){
        console.log("not logged in");
        return res.sendStatus(401);
    }

    // check if req body is complete
    if (user_id && exercise_id) {
        try{
            var queryResult = await db.removeFavoriteExercise(user_id, exercise_id);
            if (queryResult.affectedRows === 0) {
                console.log("unsuccessful unfavorite");
                return res.sendStatus(404); // unsuccessful
            }
            res.json(queryResult);
            res.sendStatus(200);
        }
        catch (err) {
            console.log('Error favoriting exercise:', err);
            res.sendStatus(500); 
        }
    }
});

module.exports=exercise
