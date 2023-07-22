const express = require("express");
const route = express.Router();
const {createWorkout, getWorkouts, deleteWorkout, getWorkout, updateWorkout} = require("../controller/workoutController")

//Get all workouts
route.get('/', getWorkouts);

//Get Specific Workout
route.get('/:id', getWorkout);

//Post workout
route.post('/createworkout',createWorkout );

//Delete the specific workout
route.delete('/deleteworkout/:id', deleteWorkout);

//PATCH - Update Specific Workout
route.patch('/:id', updateWorkout);

module.exports = route