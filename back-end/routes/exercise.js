const express = require("express");
const exercise = express.Router();
const db = require('../db/conn.js');

exercise.get('/', async (req, res, next)=>{
    //check if users logged in
    var user_id;
    if (req.session && req.session.user) {
        user_id = req.session.user.user_id;    
    }
    console.log(req.session)

    if(!user_id){
        console.log("not logged in");
        try {
            //if not logged in only default exercises
            var queryResult = await db.allExercises(-1); 
            res.json(queryResult);
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
          } catch (err) {
            console.log(err);
            res.sendStatus(500); 
          }
    }
})

exercise.post('/', async (req, res) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "User is not logged in." })
    }
    
    const user_id = req.session.user.user_id;
    const { name, video_url, description, category} = req.body;
  
    if (!name) {
      return res.status(400).json({ message: 'Bad request.' });
    }
  
    try {
      const queryResult = await db.addExercise(name, video_url, description, category, user_id);
      res.status(200).json(queryResult);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to add exercise' });
    }
  });

exercise.get('/favorite', async (req, res, next) => {
    //should retreive user id from session
    // check if req body is complete
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "User is not logged in." })
    }
    
    const user_id = req.session.user.user_id;

    try{
        var queryResult = await db.getUserFavoriteExercises(user_id);
        res.json(queryResult);
    }
    catch (err) {
        console.log('Error favoriting exercise:', err);
        res.sendStatus(500); 
    }

});

exercise.post('/favorite', async (req, res, next) => {
    const exercise_id = req.body.exercise_id;

    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "User is not logged in." })
    }
    
    const user_id = req.session.user.user_id;

    // check if req body is complete
    if (user_id && exercise_id) {
        try{
            var queryResult = await db.addFavoriteExercise(user_id, exercise_id);
            if (queryResult.affectedRows === 0) {
                console.log("unsuccessful favorite");
                return res.sendStatus(404); // unsuccessful
            }
            res.json(queryResult);
        }
        catch (err) {
            console.log('Error favoriting exercise:', err);
            res.sendStatus(500); 
        }
    }
});

exercise.delete('/favorite', async (req, res, next) => {
    const exercise_id = req.body.exercise_id;

    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "User is not logged in." })
    }
    
    const user_id = req.session.user.user_id;


    // check if req body is complete
    if (user_id && exercise_id) {
        try{
            var queryResult = await db.removeFavoriteExercise(user_id, exercise_id);
            if (queryResult.affectedRows === 0) {
                console.log("unsuccessful unfavorite");
                return res.sendStatus(404); // unsuccessful
            }
            res.json(queryResult);
        }
        catch (err) {
            console.log('Error favoriting exercise:', err);
            res.sendStatus(500); 
        }
    }
});

module.exports=exercise
