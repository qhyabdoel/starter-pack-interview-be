const Note = require("../models/noteModel");

// Controller to get all notes
exports.getAllNotes = (req, res) => {
  Note.getAll((err, notes) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(notes);
  });
};

// Controller to get a note by ID
exports.getNoteById = (req, res) => {
  const id = req.params.id;
  Note.getById(id, (err, note) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  });
};

// Controller to create a new note
exports.createNote = (req, res) => {
  const { title, description, status } = req.body;
  Note.create({ title, description, status }, (err, newNote) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(newNote);
  });
};

// Controller to update a note by ID
exports.updateNote = (req, res) => {
  const id = req.params.id;
  const { title, description, status } = req.body;
  Note.update(id, { title, description, status }, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Note updated successfully" });
  });
};

// Controller to delete a note by ID
exports.deleteNote = (req, res) => {
  const id = req.params.id;
  Note.delete(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Note deleted successfully" });
  });
};
