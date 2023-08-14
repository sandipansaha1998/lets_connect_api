const express = require("express");
const router = express.Router();
const passport = require("passport");
const conversation_api = require("../../../controllers/api/v1/conversation");

// Creates a new room
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  conversation_api.createRoom
);
// Fetches all the rooms
router.get(
  "/fetch-all",
  passport.authenticate("jwt", { session: false }),
  conversation_api.fetchAllRooms
);
// Send Message
router.post(
  "/send-message",
  passport.authenticate("jwt", { session: false }),
  conversation_api.createMessage
);
// Get all messages for a particular conversation
router.get(
  "/get-messages/:conversation_id",
  passport.authenticate("jwt", { session: false }),
  conversation_api.fetchMessages
);
module.exports = router;
