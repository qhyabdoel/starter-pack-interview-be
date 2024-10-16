const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.join("./tmp", "database.sqlite");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");

    // Create tasks table if it doesn't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'pending'
      )`,
      (err) => {
        if (err) {
          console.error("Error creating tasks table:", err.message);
        }
      }
    );

    // Create notes table if it doesn't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'pending'
      )`,
      (err) => {
        if (err) {
          console.error("Error creating notes table:", err.message);
        }
      }
    );

    // Create products table if it doesn't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error("Error creating products table:", err.message);
        }
      }
    );
  }
});

module.exports = db;
