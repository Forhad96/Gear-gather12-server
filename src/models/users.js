const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum:['user','moderator','admin'],
    default: "user",
  },
  subscription: {
    type: String,
    enum: ["free", "premium"],
    default: "free",
  },
});

const users = mongoose.model("users", userSchema);

module.exports = users;
