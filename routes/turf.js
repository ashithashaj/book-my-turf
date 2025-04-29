const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const { upload } = require("../config/cloudinary");
const { createTurf, getAllTurfs, getTurfById } = require("../Controllers/turfController");

router.post("/", auth, upload.array("photos", 5), createTurf);
router.get("/", getAllTurfs);

// 🚀 Add this route to get a single turf
router.get("/:id", getTurfById);

module.exports = router;
