const express = require("express");
const router = express.Router();
const passport = require("passport");
const user_api = require("../../../controllers/api/v1/user");

// Registers a new user
router.post("/register", user_api.register);
// Creates user session
router.post("/create-session", user_api.createSession);

module.exports = router;
