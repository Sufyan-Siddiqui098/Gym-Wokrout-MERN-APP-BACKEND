require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors = require("cors")
const workoutRoutes = require("./routes/workoutRoutes")

app.use(cors())

const url = 'mongodb://127.0.0.1:27017/Workout'

mongoose.connect(url)
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Connected to Db and Listening on Port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log(err)
})

//. When a client sends a request with JSON data in the request body, the express.json() middleware is responsible for extracting that JSON data and making it available in the req.body property of the request object.
app.use(express.json())

app.use('/api/workouts', workoutRoutes)

