const nodemailer = require("nodemailer");

const sendEmailOtp = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Turf Booking" <${process.env.EMAIL_ID}>`,
    to: email,
    subject: "OTP Verification",
    html: `<h3>Your OTP is <b>${otp}</b></h3>`,
  });
};

module.exports = sendEmailOtp;
