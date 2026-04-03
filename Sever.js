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
    const Task = {
        id : uuidv4(),
        task : req.body.task,
        completed: false
    }
    Tasks.push(Task);
    res.status(201).json(Task);
})

app.get("/task/:id", (req, res) => {
  const { id } = req.params;

  const task = Tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  return res.status(200).json({
    data: task
  });
});

app.patch('/create/:id', (req, res) => {
    const todo = todos.find((i) => i.id === (req.params.id));

    if (!todo) {
        return res.status(404).json({
            message: "todo not found!"
        });
    }

    Object.assign(todo, req.body); // patch/merge the todos :completed:true

    res.status(201).send(); // success
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`)
})