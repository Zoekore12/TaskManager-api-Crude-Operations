require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const express = require('express')
const app = express()
const PORT = process.env.PORT;


let Tasks = [
  { id: uuidv4(), task: "cleaning", completed: false },
  { id: uuidv4(), task: "cooking", completed: false }
];

app.use(express.json());

// GET all tasks
app.get('/', (req, res) => {
  return res.json(Tasks);
});

// Create a task
app.post('/create',( req,res)=> {
  const {task,completed} = req.body;
    const Task = {
        id : uuidv4(),
        task,
        completed: typeof completed === "boolean" ? completed : false
    }
    Tasks.push(Task);
    res.status(201).json(Task);
})

<<<<<<< HEAD
=======
///silk202 wants to add a single read
>>>>>>> 4246cee9930ab3fa82c08238de2db840bc8e2cfa
app.get("/task/:id", (req, res) => {
  const { id } = req.params;

  const task = Tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  return res.status(200).json(task);
});
//update/patch operation
app.patch('/task/:id',(req,res)=>{
    const task = Tasks.find((i) => i.id === (req.params.id));
    if(!task) return res.status(404).json({message:"task not found!"});
    Object.assign(task,req.body);// patch/merge the todos :completed:true
    res.status(201).send();// success
});


//added delete operation
app.delete('/task/:id', (req,res)=>{
    const del = Tasks.findIndex((i)=>i.id === req.params.id);
    if (del === -1) {
        return res.status(404).json({ message: "Task not found!" });
    }
    const deletedTodo = Tasks.splice(del, 1);

    res.status(204).send({
        message: "todo deleted successfully",
        deleted: deletedTodo[0]
    });

})



app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`)
})