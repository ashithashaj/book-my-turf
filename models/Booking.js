const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  turfId: { type: mongoose.Schema.Types.ObjectId, ref: "Turf" },
  date: Date,
  timeSlot: String,
});

bookingSchema.index({ turfId: 1, date: 1, timeSlot: 1 }, { unique: true });

module.exports = mongoose.model("Booking", bookingSchema);
