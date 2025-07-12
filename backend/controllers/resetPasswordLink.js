const User = require("../models/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const sendResetLink = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User with this email does not exist." });

    // Generate reset token valid for 15 minutes
    const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    // Link to send
    const resetLink = `https://reactcircle.vercel.app/reset-password/${resetToken}`;

    // Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail", // or your email provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>Hello ${user.username},</p>
        <p>Click below to reset your password. The link is valid for 15 minutes.</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>If you did not request this, you can safely ignore this email.</p>
      `,
    });

    return res.status(200).json({ message: "Reset link sent successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error. Try again later." });
  }
};

module.exports = sendResetLink;
