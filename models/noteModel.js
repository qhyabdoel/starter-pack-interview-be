const db = require("../config/db"); // Import and initialize the database connection

const Note = {
  // Fetch all notes
  getAll: (callback) => {
    db.all("SELECT * FROM notes", (err, rows) => {
      callback(err, rows);
    });
  },

  // Fetch a note by ID
  getById: (id, callback) => {
    db.get("SELECT * FROM notes WHERE id = ?", [id], (err, row) => {
      callback(err, row);
    });
  },

  // Create a new note
  create: (note, callback) => {
    const { title, description, status } = note;
    db.run(
      "INSERT INTO notes (title, description, status) VALUES (?, ?, ?)",
      [title, description, status],
      function (err) {
        callback(err, { id: this.lastID, ...note });
      }
    );
  },

  // Update a note by ID
  update: (id, note, callback) => {
    const { title, description, status } = note;
    db.run(
      "UPDATE notes SET title = ?, description = ?, status = ? WHERE id = ?",
      [title, description, status, id],
      function (err) {
        callback(err);
      }
    );
  },

  // Delete a note by ID
  delete: (id, callback) => {
    db.run("DELETE FROM notes WHERE id = ?", [id], function (err) {
      callback(err);
    });
  },
};

module.exports = Note;
