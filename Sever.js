require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

let Tasks = [
  { id: uuidv4(), task: "cleaning", completed: false },
  { id: uuidv4(), task: "cooking", completed: false }
];

app.use(express.json());

// GET all tasks
app.get('/', (req, res) => {
  return res.json(Tasks);
});

// ✅ Create a task WITH VALIDATION
app.post('/create', (req, res) => {
  const { task } = req.body || {};

  // 🔥 VALIDATION START
  if (!task) {
    return res.status(400).json({ error: "Task field is required" });
  }

  if (typeof task !== "string") {
    return res.status(400).json({ error: "Task must be a string" });
  }

  if (task.trim() === "") {
    return res.status(400).json({ error: "Task cannot be empty" });
  }
  // 🔥 VALIDATION END

  const Task = {
    id: uuidv4(),
    task: task.trim(),
    completed: false
  };

  Tasks.push(Task);
  return res.status(201).json(Task);
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});