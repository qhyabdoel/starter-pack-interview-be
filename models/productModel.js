const db = require("../config/db"); // Import and initialize the database connection

const Product = {
  // Fetch all products
  getAll: (callback) => {
    db.all("SELECT * FROM products", (err, rows) => {
      callback(err, rows);
    });
  },

  // Fetch a product by ID
  getById: (id, callback) => {
    db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
      callback(err, row);
    });
  },

  // Create a new product
  create: (product, callback) => {
    const { name, description, price } = product;
    db.run(
      "INSERT INTO products (name, description, price) VALUES (?, ?, ?)",
      [name, description, price],
      function (err) {
        callback(err, { id: this.lastID, ...product });
      }
    );
  },

  // Update a product by ID
  update: (id, product, callback) => {
    const { name, description, price } = product;
    db.run(
      "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?",
      [name, description, price, id],
      function (err) {
        callback(err);
      }
    );
  },

  // Delete a product by ID
  delete: (id, callback) => {
    db.run("DELETE FROM products WHERE id = ?", [id], function (err) {
      callback(err);
    });
  },
};

module.exports = Product;
