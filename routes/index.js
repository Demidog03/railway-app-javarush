const express = require("express");
const { todosRouter } = require("./todos.routes");

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ ok: true });
});

router.use(todosRouter);

module.exports = { apiRouter: router };

