const express = require("express");
const router = express.Router();
const {
  getProfile,
  editProfile,
  deleteProfile
} = require("./profile.controller");
router.get("/", getProfile);
router.put("/:id", editProfile);
router.delete("/:id", deleteProfile);
module.exports = router;
