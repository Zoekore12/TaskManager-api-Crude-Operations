require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const express = require('express')
const app = express()
const PORT = process.env.PORT;


let Tasks = [];

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("This is a crud app");
})

// Create a task
app.post('/create',( req,res)=> {
    const Task = {
        id : uuidv4(),
        task : req.body.task,
        completed: false
    }
    Tasks.push(Task);
    res.status(201).json(Task);
})


app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`)
})

