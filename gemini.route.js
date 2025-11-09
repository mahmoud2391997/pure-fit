
const express = require("express");
const router = express.Router();
const { aiChat } = require("../controllers/gemini.controller");

router.post("/chat", aiChat);

module.exports = router;
