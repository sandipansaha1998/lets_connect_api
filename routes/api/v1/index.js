const express = require("express");
const router = express.Router();
const passport = require("passport");

router.use("/user", require("./user"));
router.use("/room", require("./conversation"));
// router.use("/private-room", require("./private"));
module.exports = router;
