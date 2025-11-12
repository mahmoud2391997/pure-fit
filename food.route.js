const express = require("express");
const router = express.Router();
const { getFoods, addFood, editFood, deleteFood } = require("./food.controller");

// Get all foods
router.get("/", getFoods);

// Add new food
router.post("/", addFood);

// Edit existing food by ID
router.put("/:id", editFood);

// Delete food by ID
router.delete("/:id", deleteFood);

module.exports = router;
