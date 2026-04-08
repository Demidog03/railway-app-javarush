const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const ALLOWED_STATUSES = ["in-progress", "completed"];

const todoSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true, default: uuidv4 },
    text: { type: String, required: true, trim: true },
    status: { type: String, required: true, enum: ALLOWED_STATUSES, default: "in-progress" }
  },
  { versionKey: false, timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = { Todo, ALLOWED_STATUSES };

