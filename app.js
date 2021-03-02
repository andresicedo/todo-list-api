const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public'));

const todoList = [
  {
    id: 1,
    description: 'Implement a REST API',
    completed: false,
  },
  {
    id: 2,
    description: 'Build a frontend',
    completed: false,
  },
  {
    id: 3,
    description: '???',
    completed: false,
  },
  {
    id: 4,
    description: 'Profit!',
    completed: false,
  },
];

let nextId = 5;

// GET /api/todos
app.get("/api/todos", (req, res) => {
  res.json(todoList);//send back todoList array as JSON response
})
// GET /api/todos/:id
app.get("/api/todos/:id", (req, res) => {
  //get id from route
  const id = Number(req.params.id);
  //use id to find one todo
  const todo = todoList.find((currTodo) => {
    if(currTodo.id === id) {
      return true 
    } else {
      return false
    }
  })
    if(!todo) {
      res.status(404).json({
        error: `Could not find todo with ID: ${id}`
      })
    } else {
      //send back todo
      res.json()
    }
})
// POST /api/todos
app.post("/api/todos", (req, res) => {
  if(req.body.description) {
    const newTodo = {
      id: nextId++,
      description: req.body.description,
      completed: false,
  } 
  todoList.push(newTodo);
  res.status(201);
  res.send();
  } else {
    res.status(422);
    res.json({
      error: "Please add a description"
    })
  }
})
// PUT /api/todos/:id
app.patch("/api/todos/:id", (req, res) => {
  //if req.body contains a description
  if (req.body.description || req.body.description === "" || req.body.completed) {
      //get id from route
    const id = Number(req.params.id);
    //find where the todo exists in the todolist array
    const todoIndex = todoList.findIndex((currTodo) => currTodo.id === id)
    //update the object inside of the todo list array
    if(req.body.description) {
      todoList[todoIndex].description = req.body.description
    }
    if(req.body.completed === "true" || req.body.completed === true) {
      todoList[todoIndex].completed = true
    } else if (todoList[todoIndex].completed === "false" || req.body.completed === false){
      todoList[todoIndex].completed = false
    }
     
    //send back the updated todo item
    res.json(todoList[todoIndex])
  } else {
    res.status(422).json({
      error: "Please provide a description"
    })
  }
})
// DELETE /api/todos/:id
app.delete("/api/todos/:id", (req, res) => {
  //get id from route
  const id = Number(req.params.id);
  //find where the todo exists in the todolist array
  const todoIndex = todoList.findIndex((currTodo) => currTodo.id === id)
  if(todoIndex !== -1) {
    //remove it from array
    todoList.splice(todoIndex, 1);
    //respond with appropriate status/response
    res.status(204).json();
  } else {
    res.status(404).json({ error: `Could not find todo with id: ${id}`})
  }
})



app.listen(3000, function () {
  console.log('Todo List API is now listening on port 3000...');
});
