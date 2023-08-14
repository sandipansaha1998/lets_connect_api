const mongoose = require("mongoose");

//Schema Definition

const ConversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isRoom: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Model Definition
const conversations = mongoose.model("Conversation", ConversationSchema);
module.exports = conversations;
