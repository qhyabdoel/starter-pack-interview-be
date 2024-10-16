const pool = require("../config/db");

// Get all notes
exports.getAllNotes = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM notes");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a note by ID
exports.getNoteById = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM notes WHERE id = $1", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new note
exports.createNote = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO notes (title, description, status) VALUES ($1, $2, $3) RETURNING *",
      [title, description, status]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a note by ID
exports.updateNote = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const { rowCount } = await pool.query(
      "UPDATE notes SET title = $1, description = $2, status = $3 WHERE id = $4",
      [title, description, status, req.params.id]
    );
    if (rowCount === 0) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a note by ID
exports.deleteNote = async (req, res) => {
  try {
    const { rowCount } = await pool.query("DELETE FROM notes WHERE id = $1", [
      req.params.id,
    ]);
    if (rowCount === 0) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
