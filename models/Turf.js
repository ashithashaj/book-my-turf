const mongoose = require("mongoose");

const turfSchema = new mongoose.Schema({
  name: String,
  description: String,
  address: String,
  locationId: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
  rating: { type: Number, default: 0 },
  votes: { type: Number, default: 0 },
  photos: [String],
});

module.exports = mongoose.model("Turf", turfSchema);
