/*
NAbanita Saha
id: 301321662

*/
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  published: Boolean,
  category: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
