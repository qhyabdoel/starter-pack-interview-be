require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const productRoutes = require("./routes/productRoutes");
const noteRoutes = require("./routes/noteRoutes");
const cors = require("cors"); // Import cors
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");

const app = express();
const PORT = process.env.PORT || 3000;

// Load the Swagger YAML file
const swaggerDocument = yaml.load("./swagger.yaml");

// Setup Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use cors middleware
app.use(cors());

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/products", productRoutes);
app.use("/api/notes", noteRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
