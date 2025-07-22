const express = require("express");
const router = express.Router();
const {
  createProfile,
  checkAuthentication,
  sendVerificationCode,
  verifyCode,
  resetPassword,
  
} = require("./userAuth.controller");
const {checkTokenValidation} = require("./tokenExpire.controller");
router.post("/register", createProfile);
router.post("/login", checkAuthentication);
router.post("/sendcode", sendVerificationCode);
router.post("/verifycode", verifyCode);
router.post("/token", checkTokenValidation);

router.post("/resetpassword", resetPassword);
module.exports = router;
