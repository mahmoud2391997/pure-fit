const express = require("express");
const router = express.Router();
const { getFoods,editFood,addFood } = require("./food.controller");
router.get("/", getFoods);
router.post("/", addFood);
router.put("/:id", editFood);

module.exports = router;
