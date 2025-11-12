const express = require("express");
const router = express.Router();
const {
  getCategories,
  addCategory,
  editCategory,
  deleteCategory,
} = require("./category.controller");

// Get all categories
router.get("/", getCategories);

// Add a new category
router.post("/", addCategory);

// Edit an existing category by ID
router.put("/:id", editCategory);

// Delete a category by ID
router.delete("/:id", deleteCategory);

module.exports = router;
