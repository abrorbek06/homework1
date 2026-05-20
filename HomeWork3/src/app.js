const express = require("express");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());
app.use(productRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
});

module.exports = app;
