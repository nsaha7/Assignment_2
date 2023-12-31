/*
NAbanita Saha
id: 301321662

*/
const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  try {
    console.log("Fetching products...");
    const products = await Product.find();
    console.log("Products fetched successfully:", products);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(404).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: "Product not found" });
  }
};

const addProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProductById = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: "invalid id" });
  }
};

const removeProductById = async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.id);
    res.json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(400).json({ error: "invalid id" });
  }
};
const removeAllProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    res.json({ message: "All products removed successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const findProductsByName = async (req, res) => {
  const name = String(req.params.name);
  try {
    const products = await Product.find({
      name: { $regex: name, $options: "i" },
    });

    if (products.length === 0) {
      res
        .status(404)
        .json({ error: "No products found matching the search criteria." });
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
  removeProductById,
  removeAllProducts,
  findProductsByName,
};
