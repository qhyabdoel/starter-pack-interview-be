const express = require("express");
const { login, getMyProfile } = require("../controllers/authController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/sign-in", login);

router.get("/me", verifyToken, getMyProfile);

module.exports = router;
