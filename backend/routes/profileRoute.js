    const express = require('express');
    const router = express.Router();
    const mongoose = require("mongoose");


    const User = require("../models/user");
    const authenticateToken = require("../middleware/authMiddleware");
    const {uploadProfile} = require('../middleware/upload');


    router.get('/profile',authenticateToken,async(req,res) => {
        try{
            console.log("Decoded User ID from token:", req.user);

            const user = await User.findById(req.user.userId).select('-password');

            if(!user){
                return res.status(404).json({message:"User not Found"});
            }
            res.status(200).json({profile:user});
        } catch(err){
            console.error("Profile fetch error: ", err);
            res.status(500).json({message:"Server Error"});
        }
    });

    router.put('/update', authenticateToken, uploadProfile.single('profilePic'), async (req, res) => {
    try {
        const userId = req.user.userId;

        const updateFields = {
        username: req.body.username,
        email: req.body.email,
        profile_name: req.body.profile_name,
        about: req.body.about,
        quote: req.body.quote,
        };

        if (req.body.password && req.body.password.trim() !== '') {
        updateFields.password = req.body.password; 
        }

        if (req.file) {
        updateFields.profilePic = `uploads/profile/${req.file.filename}`;
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        Object.assign(user, updateFields);

        await user.save(); 

        res.status(200).json({ message: 'Profile updated successfully', profile: user });
    } catch (err) {
        console.error("Profile update error:", err);
        res.status(500).json({ message: 'Server Error' });
    }
    });


    router.put('/profilepic-upload', authenticateToken, uploadProfile.single('profile'), async(req,res) =>{
        try{
            if(!req.file){
                return res.status(400).json({message:"No file uploaded"});
            }
            const user = await User.findById(req.user.userId);
            if(!user){
                return res.status(404).json({message:"User not found"});
            }

            user.profilePic = `uploads/profile/${req.file.filename}`;
            await user.save();

            res.status(200).json({message:"Profile picture updated",profilePic:user.profilePic});
        }
        catch(err){
            console.error("Error uploading profile pic: ",err);
            res.status(500).json({message:"Server Error"});
        }
    });


    router.post('/:id/interact', authenticateToken, async (req, res) => {
        try {
            const currentUserId = req.user.userId;
            const targetUserId = req.params.id;

            if (currentUserId === targetUserId) {
            return res.status(400).json({ message: "You can't interact with yourself" });
            }

            const currentUser = await User.findById(currentUserId);
            const alreadyInteracted = currentUser.interactions.includes(targetUserId);

            if (alreadyInteracted) {
            currentUser.interactions = currentUser.interactions.filter(id => id.toString() !== targetUserId);
            } else {
            currentUser.interactions.push(targetUserId);
            }

            await currentUser.save();

            res.status(200).json({
            message: alreadyInteracted ? "Uninteracted" : "Interacted",
            totalInteractions: currentUser.interactions.length,
            });
        } catch (err) {
            console.error("Interaction error:", err);
            res.status(500).json({ message: "Server Error" });
        }
    });

    router.get('/search', async(req,res) => {
        try{
            const {profile_name} = req.query;
            const user = await User.findOne({profile_name});
            if(!user){
                return res.status(404).json({message:"User not Found"});
            }
            res.status(200).json({id: user._id, profile_name: user.profile_name, username: user.username, profilePic: user.profilePic})
        }
        catch(err){
            console.error("Search error:", err);
            res.status(500).json({ message: "Server error" });
        }   
    });


        // GET /users/:id - Get profile by ID (without authentication)
    router.get('/:id', async (req, res) => {
        try {
            const userId = req.params.id;

            // Check for valid ObjectId to avoid CastError
            if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
            }

            const user = await User.findById(userId).select('-password');
            if (!user) {
            return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({ profile: user });
        } catch (err) {
            console.error("Error fetching user profile:", err);
            res.status(500).json({ message: "Server Error" });
        }
    });

    // Check if logged-in user has interacted with target profile
    router.get('/:id/interacted', authenticateToken, async (req, res) => {
        try {
            const currentUserId = req.user.userId;
            const targetUserId = req.params.id;

            const currentUser = await User.findById(currentUserId);

            if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
            }

            const hasInteracted = currentUser.interactions.includes(targetUserId);

            res.status(200).json({ interacted: hasInteracted });
        } catch (err) {
            console.error("Error checking interaction:", err);
            res.status(500).json({ message: "Server error" });
        }
    });


module.exports = router;