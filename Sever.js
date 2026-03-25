require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const express = require('express')
const app = express()
const PORT = process.env.PORT;


let Tasks = [
    {id:uuidv4(), task:"cleaning" ,completed:"false"},
    {id:uuidv4(), task:"cooking", completed:"false"}
];

app.use(express.json());

app.get('/',(req,res)=>{
    res.json(Tasks);
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

