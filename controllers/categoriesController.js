const Categories = require("../models/categories");

const categoryByID = async (req, res, next, id) => {
  try {
    const category = await Categories.findById(id);
    res.json(category);
  } catch (error) {
    return res.status(400).json({ error: "Category not found" });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addCategory = async (req, res) => {
  try {
    const newCategory = await Categories.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: "Category not found" });
  }
};

const updateCategoryById = async (req, res) => {
  try {
    const updatedCategory = await Categories.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: "Category not found" });
  }
};

const removeCategoryById = async (req, res) => {
  try {
    await Categories.findByIdAndRemove(req.params.id);
    res.json({ message: "Category removed successfully" });
  } catch (error) {
    res.status(400).json({ error: "Category not found" });
  }
};

const removeAllCategories = async (req, res) => {
  try {
    await Categories.deleteMany({});
    res.json({ message: "All categories removed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const findCategoriesByName = async (req, res) => {
  const name = String(req.params.name);

  try {
    const categories = await Categories.find({
      name: { $regex: name, $options: "i" },
    });
    if (categories.length === 0) {
      res
        .status(404)
        .json({ error: "No categories found matching the search criteria." });
    } else {
      res.json(categories);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  categoryByID,
  getAllCategories,
  addCategory,
  getCategoryById,
  updateCategoryById,
  removeCategoryById,
  removeAllCategories,
  findCategoriesByName,
};
