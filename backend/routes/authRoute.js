const express = require('express');
const router = express.Router();

const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require("passport");
const authMiddleware = require('../middleware/authMiddleware');
const sendResetLink = require('../controllers/resetPasswordLink');

router.post("/register" , async(req , res) => {
    try{
        const {username, profile_name, email, password} = req.body;

        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const newUser = new User({
            username,
            profile_name,
            email,
            password
        });

        await newUser.save();

        res.status(201).json({message:"Successfully registered"});
    }
    catch(err){
        console.error("Registration error:",err);
        res.status(500).json({message:"Server Error"});
    }
});




router.post("/login", async(req , res) => {
    try{
        const {username,email,password} = req.body;

        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({message:"Invalid email or password"});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch){
            return res.status(400).json({message:"Wrong password"});
        } 

        const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '60m' } // short-lived access token
        );

        const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.REFRESH_SECRET,
        { expiresIn: '7d' } // long-lived refresh token
        );
        res.status(200).json({message:"Login Successful", accessToken, refreshToken, user:{id:user._id,username: user.username,email:user.email}});
    }
    catch(err){
        console.error("Login Error: ",err);
        res.status(500).json({message:"Server Error"});
    }
});


router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "http://localhost:3000/login" }),
  async (req, res) => {
    try {
      const user = req.user;

      // ✅ Generate tokens
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "60m" }
      );

      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      // 🔁 Redirect to frontend with tokens (e.g., via query string)
      return res.redirect(
        `http://localhost:3000/oauth-success/${accessToken}/${refreshToken}`
      );
    } catch (err) {
      console.log("Google Auth Callback Error:", err);
      return res.redirect("http://localhost:3000/login");
    }
  }
);


router.post('/refresh-token', async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token required' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET,
      { expiresIn: '60m' }
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Refresh token error:", err);
    res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
});

router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.email;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await User.findOneAndUpdate(
      { email: userEmail },
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "Password updated successfully!" });

  } catch (error) {
    console.error("Reset password error:", error.message);
    res.status(400).json({ message: "Invalid or expired token." });
  }
});


router.post("/forgot-password", sendResetLink);

module.exports = router;