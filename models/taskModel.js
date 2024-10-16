const db = require("../config/db");

const Task = {
  create: (task, callback) => {
    const { title, description, status } = task;
    db.run(
      `INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)`,
      [title, description, status || "pending"],
      function (err) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, { id: this.lastID, ...task });
        }
      }
    );
  },

  findAll: (callback) => {
    db.all(`SELECT * FROM tasks`, [], (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  },

  findById: (id, callback) => {
    db.get(`SELECT * FROM tasks WHERE id = ?`, [id], (err, row) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, row);
      }
    });
  },

  update: (id, task, callback) => {
    const { title, description, status } = task;
    db.run(
      `UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?`,
      [title, description, status, id],
      function (err) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, { id, ...task });
        }
      }
    );
  },

  delete: (id, callback) => {
    db.run(`DELETE FROM tasks WHERE id = ?`, [id], function (err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { message: "Task deleted successfully" });
      }
    });
  },
};

module.exports = Task;
