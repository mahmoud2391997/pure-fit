const Category = require("./category.model");
const Mongoose = require("mongoose");

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

// Add a new category
const addCategory = async (req, res) => {
  const category = req.body;

  try {
    const response = await Category.create(category);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

// Edit an existing category
const editCategory = async (req, res) => {
  const id = req.params.id;
  const category = req.body;

  try {
    const response = await Category.updateOne(
      { _id: new Mongoose.Types.ObjectId(id) },
      { $set: category },
      { upsert: false }
    );
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  const id = req.params.id;

  try {
    const response = await Category.deleteOne({
      _id: new Mongoose.Types.ObjectId(id),
    });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

module.exports = {
  getCategories,
  addCategory,
  editCategory,
  deleteCategory,
};
