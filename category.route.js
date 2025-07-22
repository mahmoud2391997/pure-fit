const express = require("express");
const router = express.Router();
const { editCategory,addCategory ,getCategories} = require("./category.controller");
router.get("/", getCategories);
router.post("/", addCategory);

router.put("/:id", editCategory);


module.exports = router;
