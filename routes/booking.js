const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const { bookTurf, getUserBookings } = require("../Controllers/bookingController");

router.post("/", auth, bookTurf);
router.get("/", auth, getUserBookings);

module.exports = router;
