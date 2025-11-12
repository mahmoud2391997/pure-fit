const express = require("express");
const router = express.Router();
const {
  getDrinks,
  addDrink,
  editDrink,
  deleteDrink,
} = require("./drinks.controller");

// Get all drinks
router.get("/", getDrinks);

// Add a new drink
router.post("/", addDrink);

// Edit a drink by ID
router.put("/:id", editDrink);

// Delete a drink by ID
router.delete("/:id", deleteDrink);

module.exports = router;
