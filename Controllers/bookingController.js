const Booking = require("../models/Booking");

exports.bookTurf = async (req, res) => {
  const { turfId, date, timeSlot } = req.body;
  try {
    const booking = await Booking.create({
      userId: req.user.userId,
      turfId,
      date,
      timeSlot,
    });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ msg: "Slot already booked or invalid data." });
  }
};

exports.getUserBookings = async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.userId }).populate("turfId");
  res.json(bookings);
};
