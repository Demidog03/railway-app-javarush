const { Todo, ALLOWED_STATUSES } = require("../models/todo.model");

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

function isValidStatus(v) {
  return typeof v === "string" && ALLOWED_STATUSES.includes(v);
}

async function listTodos(req, res, next) {
  try {
    const todos = await Todo.find()
      .select({ _id: 0, id: 1, text: 1, status: 1 })
      .sort({ createdAt: -1 })
      .lean();
    res.json(todos);
  } catch (err) {
    next(err);
  }
}

async function getTodo(req, res, next) {
  try {
    const { id } = req.params;
    if (!isNonEmptyString(id)) return res.status(400).json({ message: "Invalid id" });

    const todo = await Todo.findOne({ id })
      .select({ _id: 0, id: 1, text: 1, status: 1 })
      .lean();
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (err) {
    next(err);
  }
}

async function createTodo(req, res, next) {
  try {
    const { text, status } = req.body ?? {};

    if (!isNonEmptyString(text)) {
      return res.status(400).json({ message: "text is required" });
    }
    if (status !== undefined && !isValidStatus(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const created = await Todo.create({
      text: text.trim(),
      status: status ?? "in-progress"
    });

    res.status(201).json({ id: created.id, text: created.text, status: created.status });
  } catch (err) {
    next(err);
  }
}

async function replaceTodo(req, res, next) {
  try {
    const { id } = req.params;
    if (!isNonEmptyString(id)) return res.status(400).json({ message: "Invalid id" });

    const { text, status } = req.body ?? {};
    if (!isNonEmptyString(text)) {
      return res.status(400).json({ message: "text is required" });
    }
    if (!isValidStatus(status)) {
      return res.status(400).json({ message: "status is required and must be valid" });
    }

    const updated = await Todo.findOneAndUpdate(
      { id },
      { $set: { text: text.trim(), status } },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) return res.status(404).json({ message: "Todo not found" });
    res.json({ id: updated.id, text: updated.text, status: updated.status });
  } catch (err) {
    next(err);
  }
}

async function patchTodo(req, res, next) {
  try {
    const { id } = req.params;
    if (!isNonEmptyString(id)) return res.status(400).json({ message: "Invalid id" });

    const patch = req.body ?? {};
    const set = {};

    if ("text" in patch) {
      if (!isNonEmptyString(patch.text)) {
        return res.status(400).json({ message: "text must be a non-empty string" });
      }
      set.text = patch.text.trim();
    }

    if ("status" in patch) {
      if (!isValidStatus(patch.status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      set.status = patch.status;
    }

    if (Object.keys(set).length === 0) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const updated = await Todo.findOneAndUpdate(
      { id },
      { $set: set },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) return res.status(404).json({ message: "Todo not found" });
    res.json({ id: updated.id, text: updated.text, status: updated.status });
  } catch (err) {
    next(err);
  }
}

async function deleteTodo(req, res, next) {
  try {
    const { id } = req.params;
    if (!isNonEmptyString(id)) return res.status(400).json({ message: "Invalid id" });

    const deleted = await Todo.findOneAndDelete({ id }).lean();
    if (!deleted) return res.status(404).json({ message: "Todo not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listTodos,
  getTodo,
  createTodo,
  replaceTodo,
  patchTodo,
  deleteTodo
};

