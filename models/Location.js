const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: String,
  city: String,
  state: String,
});

module.exports = mongoose.model("Location", locationSchema);
