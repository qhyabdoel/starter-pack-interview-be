const bcrypt = require("bcryptjs");

// Mock user database
const users = [
  {
    id: 1,
    email: "demo@minimals.cc",
    password: bcrypt.hashSync("@demo1", 10), // Hashed password
  },
];

// Function to find a user by email
function findUserByEmail(email) {
  return users.find((user) => user.email === email);
}

// Function to verify user password
function verifyPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

module.exports = { findUserByEmail, verifyPassword };
