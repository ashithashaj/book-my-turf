const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const sendEmailOtp = require("../utils/sendEmailOtp");

// 👇 export validation middleware separately (to use in your route)
exports.registerValidation = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("phoneNumber").isMobilePhone().withMessage("Invalid phone number"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { username, email, phoneNumber, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ msg: "Email already in use" });

  const hashed = await bcrypt.hash(password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

  const user = await User.create({
    username,
    email,
    phoneNumber,
    password: hashed,
    otp,
    isVerified: false,
  });

  await sendEmailOtp(email, otp);

  res.status(200).json({ msg: "OTP sent to email. Please verify." });
};

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) return res.status(404).json({ msg: "User not found" });
    if (user.otp !== otp) return res.status(400).json({ msg: "Invalid OTP" });
  
    user.isVerified = true;
    user.otp = null;
    await user.save();
  
    res.status(200).json({ msg: "Email verified successfully" });
  };


exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ msg: "Invalid credentials" });

  if (!user.isVerified)
    return res.status(401).json({ msg: "Please verify your email before logging in" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token });
};


exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password -otp");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { username, email, phoneNumber } = req.body;

    // Basic validation (optional but recommended)
    if (!username || !email || !phoneNumber) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, phoneNumber },
      { new: true, runValidators: true }
    ).select("-password -otp");

    if (!updatedUser) return res.status(404).json({ msg: "User not found" });

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
