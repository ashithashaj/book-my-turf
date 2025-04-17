const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  phoneNumber: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);
