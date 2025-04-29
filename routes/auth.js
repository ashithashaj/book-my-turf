const router = require("express").Router();
const { register, login, registerValidation, verifyOtp, getMe } = require("../Controllers/authController");
const auth = require("../middlewares/authMiddleware");
const { updateProfile } = require("../Controllers/authController");

router.post("/register", registerValidation, register);
router.post("/verify", verifyOtp);
router.post("/login", login);
router.get("/me", auth, getMe); // 🔐 Protected route
router.put("/update", auth, updateProfile); // 🔐 Protected route to update profile

module.exports = router;
