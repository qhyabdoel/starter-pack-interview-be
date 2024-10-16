const pool = require("../config/db");

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM tasks");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a task by ID
exports.getTaskById = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM tasks WHERE id = $1", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *",
      [title, description, status]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const { rowCount } = await pool.query(
      "UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4",
      [title, description, status, req.params.id]
    );
    if (rowCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  try {
    const { rowCount } = await pool.query("DELETE FROM tasks WHERE id = $1", [
      req.params.id,
    ]);
    if (rowCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
