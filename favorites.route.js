const express = require("express");
const router = express.Router();
const { getFavorites,removeFavorites,addFavorites } = require("./favorites.controller");
router.get("/:profileId",getFavorites);
router.post("/:profileId",addFavorites);
router.put("/:profileId", removeFavorites);

module.exports = router;
