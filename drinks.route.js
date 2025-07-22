const express = require("express");
const router = express.Router();
const { getDrinks,addDrink,editDrink} = require("./drinks.controller")
router.get("/", getDrinks);
router.post("/", addDrink);
router.put("/:id", editDrink);

module.exports = router;
