const Product = require("../models/productModel");

// Controller to get all products
exports.getAllProducts = (req, res) => {
  Product.getAll((err, products) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(products);
  });
};

// Controller to get a product by ID
exports.getProductById = (req, res) => {
  const id = req.params.id;
  Product.getById(id, (err, product) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  });
};

// Controller to create a new product
exports.createProduct = (req, res) => {
  const { name, description, price } = req.body;
  Product.create({ name, description, price }, (err, newProduct) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(newProduct);
  });
};

// Controller to update a product by ID
exports.updateProduct = (req, res) => {
  const id = req.params.id;
  const { name, description, price } = req.body;
  Product.update(id, { name, description, price }, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Product updated successfully" });
  });
};

// Controller to delete a product by ID
exports.deleteProduct = (req, res) => {
  const id = req.params.id;
  Product.delete(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Product deleted successfully" });
  });
};
