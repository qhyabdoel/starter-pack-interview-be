const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const verifyToken = require("../middlewares/authMiddleware");

// Routes using the controller methods
router.get("/", verifyToken, noteController.getAllNotes);
router.get("/:id", verifyToken, noteController.getNoteById);
router.post("/", verifyToken, noteController.createNote);
router.put("/:id", verifyToken, noteController.updateNote);
router.delete("/:id", verifyToken, noteController.deleteNote);

module.exports = router;
