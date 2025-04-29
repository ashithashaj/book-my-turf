const router = require("express").Router();
const { register, login, registerValidation, verifyOtp, getMe } = require("../Controllers/authController");
const auth = require("../middlewares/authMiddleware");

router.post("/register", registerValidation, register);
router.post("/verify", verifyOtp);
router.post("/login", login);
router.get("/me", auth, getMe); // 🔐 Protected route

module.exports = router;
