const router = require("express").Router();
const { register, login, registerValidation, verifyOtp } = require("../Controllers/authController");

router.post("/register", registerValidation, register);
router.post("/verify", verifyOtp);
router.post("/login", login);

module.exports = router;
