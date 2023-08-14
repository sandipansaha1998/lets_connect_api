const express = require("express");
const router = express.Router();
const passport = require("passport");

router.use("/user", require("./user"));
router.use("/room", require("./conversation"));
module.exports = router;
