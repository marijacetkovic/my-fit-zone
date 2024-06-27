const express = require('express');
const mysql = require ("mysql2");

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, 
    database: process.env.DB_DATABASE,
  })

conn.connect((err) => {
      if(err){
          console.log("ERROR: " + err.message);
          return;    
      }
      console.log('Connection established');
    })
  
let dataPool={}

//users

//add new user
dataPool.addUser=(name,surname,role,email,password)=>{
  return new Promise ((resolve, reject)=>{
    conn.query(`INSERT INTO User (name,surname,role,email,password) VALUES (?,?,?,?,?)`,
      [name, surname, role, email, password], (err,res)=>{
      if (err) return reject(err);
      return resolve(res);
    })
  })
}

dataPool.allUsers=()=>{
  return new Promise ((resolve, reject)=>{
    conn.query(`SELECT * FROM User`, (err,res)=>{
      if (err) return reject(err);
      return resolve(res);
    })
  })
}

//authenticate user
// encrypted passwords?? 
dataPool.authUser=(email)=>{
  return new Promise ((resolve, reject)=>{
    conn.query('SELECT * FROM User WHERE email = ?', email, (err,res)=>{
      if (err) return reject(err);
      return resolve(res);
    })
  })
}

dataPool.assignAdmin=(id)=>{
  return new Promise ((resolve, reject)=>{
    conn.query('UPDATE User SET role = ? WHERE id = ?', ['admin', id], (err,res)=>{
      if (err) return reject(err);
      return resolve(res);
    })
  })
}

//establish user profiles for non admin users
dataPool.addUserProfile=(id,height,weight,cal_intake)=>{
  return new Promise ((resolve, reject) => {
    conn.query(`INSERT INTO UserProfile (height,weight,cal_intake,user_id) VALUES (?,?,?,?)`,
      [height, weight, cal_intake, id], (err,res)=>{
      if (err) return reject(err);
      return resolve(res);
    })
  })
}
//update profile needed
dataPool.updateUserProfile = (id, height, weight, cal_intake) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `UPDATE UserProfile SET height = ?, weight = ?, cal_intake = ? WHERE user_id = ?`,
      [height, weight, cal_intake, id], (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      }
    );});
}

dataPool.getUserProfile = (userId) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `SELECT * FROM UserProfile WHERE user_id = ?`,
      [userId], (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      }
    );});
};
//delete user?
//should be allowed only to delete himself / possibly admin should delete 
dataPool.deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(`DELETE FROM user WHERE id = ?`, [id],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
  });
};


//diary entries 

//retrieve all diary entries for a given user
//should be sorted by date descending
dataPool.allUserDiaryEntries=(id)=>{
  return new Promise ((resolve, reject)=>{
    conn.query(`SELECT * FROM DiaryEntry where user_id = ?`,[id],(err,res)=>{
      if (err) return reject(err);
      return resolve(res);
    })
  })
}

//adds a new user diary entry
dataPool.addDiaryEntry=(duration, cal_burned, cal_consumed, hours_slept, water_intake, 
  image, description, workout_id, event_id, user_id)=>{
  //add foreign keys for linking diary entry with activity/event/workout 
  return new Promise ((resolve, reject)=>{
    conn.query(`INSERT INTO DiaryEntry (duration, cal_burned, cal_consumed, 
      hours_slept, water_intake, image, description, workout_id, event_id, user_id) 
      VALUES (?,?,?,?,?,?,?)`,
      [duration, cal_burned, cal_consumed, hours_slept, water_intake, image, 
        description, workout_id, event_id, user_id], (err,res)=>{
      if (err) return reject(err);
      return resolve(res);
    })
  })
}

//delete diary entry
dataPool.deleteDiaryEntry = (id, user_id) => {
  return new Promise((resolve, reject) => {
    conn.query(`DELETE FROM DiaryEntry WHERE id = ? and user_id = ?`, [id,user_id],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
  });
};

//creating new workout
dataPool.addWorkout=(id, name, user_id)=>{
  return new Promise ((resolve, reject)=>{
    //get date
    let date = new Date().toISOString().splice(0,10); //get YYYY-MM-DD
    conn.query(`INSERT INTO Workout (id, name, date, user_id) 
      VALUES (?,?,?,?)`,
      [id, name, date, user_id], (err,res)=>{
      if (err) return reject(err);
      return resolve(res);
    })
  })
}

//deleting a workout
dataPool.deleteWorkout = (workout_id, user_id) => {
  return new Promise((resolve, reject) => {
    conn.query(`DELETE FROM Workout WHERE id = ? and user_id = ?`, [workout_idid, user_id],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
  });
};

//all workouts for a user
dataPool.allUserWorkouts = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT id, name, date FROM Workout WHERE user_id = ?`, [id],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
  });
};

//connecting workout and exercise
dataPool.addWorkoutExercise = (workout_id, exercise_name, sets, reps, exercise_id) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `INSERT INTO WorkoutExercise (workout_id, exercise_name, sets, reps, exercise_id)
       VALUES (?, ?, ?, ?)`,
      [workout_id, exercise_id, sets, reps],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      }
    );
  });
};

//get workout details ??
//retreives exercises that are a part of given workout
dataPool.getWorkoutExercises = (workout_id) => {
  return new Promise((resolve, reject) => {
    //i might not even need this join
    conn.query(
      `SELECT * FROM Exercise e
      JOIN WorkoutExercise w on e.id = w.exercise_id
      WHERE w.workout_id = ?
      `,
      [workout_id],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      }
    );
  });
};


//exercises

//add new exercise
dataPool.addExercise = (name, video_url, description, category, user_id) => {
  //user id should be differernt for admin and personal exercises - user id
  return new Promise((resolve, reject) => {
    conn.query(
      `INSERT INTO Exercise (name, video_url, description, category, user_id)
       VALUES (?, ?, ?, ?, ?)`,
      [name, video_url, description, category, user_id],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      }
    );
  });
};

//favorite an exercise
dataPool.addFavoriteExercise = (user_id, exercise_id) => {
  //user id should be differernt for admin and personal exercises - user id
  return new Promise((resolve, reject) => {
    conn.query(
      `INSERT INTO FavoriteExercise (user_id, exercise_id)
       VALUES (?, ?)`,
      [user_id,exercise_id],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      }
    );
  });
};


//unfavorite an exercise
dataPool.removeFavoriteExercise = (user_id, exercise_id) => {
  //user id should be differernt for admin and personal exercises - user id
  return new Promise((resolve, reject) => {
    conn.query(
      `DELETE FROM FavoriteExercise WHERE user_id = ? AND exercise_id = ?`,
      [user_id,exercise_id],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      }
    );
  });
};

dataPool.getUserFavoriteExercises = (user_id) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT Exercise.id, Exercise.name
    FROM FavoriteExercise 
    JOIN Exercise ON FavoriteExercise.exercise_id = Exercise.id 
    WHERE FavoriteExercise.user_id = ?
    `;
    conn.query(query, [user_id], (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
};
//get all exercises
dataPool.allExercises = (user_id) => {
  //user id should be differernt for admin and personal exercises - user id
  return new Promise((resolve, reject) => {
    conn.query(
      `SELECT e.id, e.name
      FROM Exercise e
      INNER JOIN User u ON e.user_id = u.id
      WHERE e.user_id = ? OR u.role = 'admin'
      )`,
      [user_id],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      }
    );
  });
};

//delete an exercise
dataPool.deleteExercise = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `DELETE FROM Exercise WHERE id = ?`,
      [id],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      }
    );
  });
};


//events

//create new event
dataPool.addEvent=(name,time,location,organization,description, admin_id)=>{
  return new Promise ((resolve, reject)=>{
    //check role - only admins should add events
    conn.query(`INSERT INTO Event (name,time,location,organization,description,admin_id) VALUES (?,?,?,?,?,?)`,
      [name, time, location, organization, description, admin], (err,res) => {
      if (err) return reject(err);
      return resolve(res);
    })
  })
}

//get all events 
dataPool.allEvents = () => {
  return new Promise((resolve, reject) => {
    conn.query(
      `SELECT *
      FROM Event `, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      }
    );});
};

dataPool.getEventById = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `SELECT *
      FROM Event
      WHERE id = ? `, id, (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      }
    );});
};


//remove event 

//FOR ADMINS  - event management - deleting events, displaying signed up users, displaying most active users??
//also event validation 

//store user event sign up 
dataPool.addEventSignUp=(eventId, userId)=>{
  return new Promise ((resolve, reject)=>{
    //should check capacity of the event 
    conn.query(`INSERT INTO EventSignup (s_event_id,s_user_id) VALUES (?,?)`,
      [eventId, userId], (err,res)=>{
      if (err) return reject(err);
      return resolve(res);
    })
  })
}

//remove event sign up
dataPool.removeEventSignUp=(eventId, userId)=>{
  return new Promise ((resolve, reject)=>{
    //should check capacity of the event 
    conn.query(`DELETE FROM EventSignup WHERE s_event_id = ? AND s_user_id = ?`,
      [eventId, userId], (err,res)=>{
      if (err) return reject(err);
      return resolve(res);
    })
  })
}

dataPool.getEventsForUser = (userId) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `SELECT e.id, e.name
      FROM Event e
      JOIN EventSignup es ON e.id = es.s_event_id
      WHERE es.s_user_id = ?`,
      userId,
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      }
    );
  });
};

module.exports = dataPool;