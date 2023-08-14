const express = require("express");
const router = express.Router();
const passport = require("passport");
const conversation_api = require("../../../controllers/api/v1/conversation");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  conversation_api.getPrivateChats
);
module.exports = router;
