const express = require("express");
const {
  listTodos,
  getTodo,
  createTodo,
  replaceTodo,
  patchTodo,
  deleteTodo
} = require("../controllers/todos.controller");

const router = express.Router();

router.get("/todos", listTodos);
router.get("/todos/:id", getTodo);
router.post("/todos", createTodo);
router.put("/todos/:id", replaceTodo);
router.patch("/todos/:id", patchTodo);
router.delete("/todos/:id", deleteTodo);

module.exports = { todosRouter: router };

