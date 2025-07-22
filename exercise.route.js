const express = require("express");
const router = express.Router();
const { getExercises ,editExercise,addExercise} = require("./exercise.controller");
router.get("/:categoryId", getExercises);
router.put("/:exersiceId", editExercise);
router.post("/", addExercise);

module.exports = router;
