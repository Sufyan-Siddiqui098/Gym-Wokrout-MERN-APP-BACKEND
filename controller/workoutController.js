const Workout = require("../model/workoutModel")  //Schema model for DB
const mongoose = require("mongoose")

//Get All Workouts 
const getWorkouts = async (req, res)=>{
    const workout = await Workout.find().sort({createdAt: -1});  //Sort in descending order
   return res.status(200).json(workout)
}

//Get Specific Workout
const getWorkout = async (req, res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: "No such Workout Found !"})
    }
    const workout = await Workout.findById(id);
    if(!workout){
        return res.status(400).json({msg: "No such Workout Found !"})
    }

    res.status(200).json(workout)
}

//POST -- Create new Workout
const createWorkout = async(req, res)=>{
    const {title, reps, load} = req.body;
    let emptyField = [];
    if(!title){
        emptyField.push('title')
    }
    if(!reps){
        emptyField.push('reps')
    }
    if(!load){
        emptyField.push('load')
    }

    if(emptyField.length > 0){
        return res.status(400).json({error: "Please fill in all fields", emptyField})
    }
    //add document to DB
    try {
        const workout = await Workout.create({title, reps, load})
         res.status(200).json(workout)
    }
    catch (err){
        res.status(400).json({error: err.message})
    }
}

//DELETE -- Delete the workout 
const deleteWorkout = async(req, res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: "No such workout found! "})
    }
    const workout = await Workout.findOneAndDelete({_id: id})
    if(!workout){
        return res.status(404).json({msg: "No such Workout Found !"})
    }
    return res.status(200).json(workout)
}

//PATCH -- Update a specific workout
const updateWorkout = async (req, res)=> {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: "No such Workout Found !"})
    }
    const workout = await Workout.findByIdAndUpdate({_id: id}, {
        ...req.body
    },
    { new: true }
    )
    if(!workout){
        return res.status(404).json({msg: "No such Workout Found !"})
    }
    
    res.status(200).json(workout)
}

module.exports = {getWorkouts, createWorkout, deleteWorkout, getWorkout, updateWorkout}