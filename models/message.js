const mongoose = require("mongoose");

//Schema Definition

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    content_type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Model Definition
const messages = mongoose.model("Message", MessageSchema);
module.exports = messages;
