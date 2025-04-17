const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const { upload } = require("../config/cloudinary");
const { createTurf, getAllTurfs } = require("../Controllers/turfController");

router.post("/", auth, upload.array("photos", 5), createTurf);
router.get("/", getAllTurfs);

module.exports = router;
