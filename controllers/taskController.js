const Task = require("../models/taskModel");

const createTask = (req, res) => {
  const { title, description, status } = req.body;
  Task.create({ title, description, status }, (err, task) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(201).json(task);
  });
};

const getTasks = (req, res) => {
  Task.findAll((err, tasks) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json(tasks);
  });
};

const getTaskById = (req, res) => {
  const { id } = req.params;
  Task.findById(id, (err, task) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  });
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  Task.update(id, { title, description, status }, (err, task) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json(task);
  });
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  Task.delete(id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json(result);
  });
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
