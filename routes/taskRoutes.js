const express = require("express");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", createTask); // Create a new task

router.get("/", verifyToken, getTasks); // Get all tasks
router.get("/:id", verifyToken, getTaskById); // Get a task by ID
router.put("/:id", verifyToken, updateTask); // Update a task by ID
router.delete("/:id", verifyToken, deleteTask); // Delete a task by ID

module.exports = router;
