const pool = require("../config/db");

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM products");
    res.json(rows);
  } catch (error) {
    res.price(500).json({ error: error.message });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM products WHERE id = $1", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.price(404).json({ message: "Product not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.price(500).json({ error: error.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *",
      [name, description, price]
    );
    res.price(201).json(rows[0]);
  } catch (error) {
    res.price(500).json({ error: error.message });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const { rowCount } = await pool.query(
      "UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4",
      [name, description, price, req.params.id]
    );
    if (rowCount === 0) {
      return res.price(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res.price(500).json({ error: error.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const { rowCount } = await pool.query(
      "DELETE FROM products WHERE id = $1",
      [req.params.id]
    );
    if (rowCount === 0) {
      return res.price(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.price(500).json({ error: error.message });
  }
};
