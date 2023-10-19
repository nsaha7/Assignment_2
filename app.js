/*
NAbanita Saha
id: 301321662

*/
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const config = require("./config/config");

const app = express();
const PORT = config.port;

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB is successful!");

  app.get("/", (req, res) => {
    res.json({ message: "Welcome to DressStore Application." });
  });

  app.use("/api/products", productRoutes);
  app.use(`/api/categories`, categoriesRoutes);

  app.listen(PORT, () => {
    //console.log(`Server is running at ${PORT}`);
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
