const jwt = require("jsonwebtoken");
const { findUserByEmail, verifyPassword } = require("../users");
const JWT_SECRET = process.env.JWT_SECRET;

const login = (req, res) => {
  const { email, password } = req.body;
  const user = findUserByEmail(email);

  if (!user || !verifyPassword(user, password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ message: "Login successful", accessToken });
};

const getMyProfile = (req, res) => {
  res.json({ message: "Successfully get user data", user: req.user });
};

module.exports = { login, getMyProfile };
