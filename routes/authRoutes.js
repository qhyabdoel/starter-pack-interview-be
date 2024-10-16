const express = require("express");
const { login, getMyProfile } = require("../controllers/authController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /api/auth/sign-in:
 *   post:
 *     summary: Log in a user and return a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: "demo@minimals.cc"
 *               password: "@demo1"
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post("/sign-in", login);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get login user progfile
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Succes get login user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *       404:
 *         description: Data not found
 */
router.get("/me", verifyToken, getMyProfile);

module.exports = router;
