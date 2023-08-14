const mongoose = require("mongoose");

//Schema Definition

const UserSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Model Definition
const users = mongoose.model("User", UserSchema);
module.exports = users;
