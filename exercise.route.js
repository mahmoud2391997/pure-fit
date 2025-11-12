const express = require("express");
const router = express.Router();
const { getExercises, editExercise, addExercise, deleteExercise } = require("./exercise.controller");

// Get all exercises by category ID
router.get("/:categoryId", getExercises);

// Edit exercise by ID
router.put("/:exersiceId", editExercise);

// Add a new exercise
router.post("/", addExercise);

// ✅ Delete exercise by ID
router.delete("/:exersiceId", deleteExercise);

module.exports = router;
