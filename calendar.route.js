const express = require("express");
const router = express.Router();
const { resetCalendar,getCalendar,updateCalendarValues}=require("./calendar.controller");

router.get("/:profileId", getCalendar);
router.post("/:profileId", updateCalendarValues);

router.put("/:profileId", resetCalendar);


module.exports = router
