const express = require('express');
const router = express.Router();

const Post = require('../models/post');
const authenticateToken = require('../middleware/authMiddleware');
const user = require('../models/user');
const {uploadPost} = require('../middleware/upload');
const path = require('path');
const {cloudinary} = require("../middleware/cloudinary"); // make sure this path is correct
const fs = require("fs");

router.post('/', authenticateToken, uploadPost.single('image'), async (req, res) => {
  try {
    const { title, caption, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title and Caption are required" });
    }

    let imageURL = "";

    if (req.file) {
      // 1. Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "post_images",
      });

      imageURL = result.secure_url;

      // 2. Delete local image
      fs.unlinkSync(req.file.path);
    }

    const newPost = new Post({
      title,
      caption,
      description,
      imageURL,
      author: req.user.userId
    });

    await newPost.save();

    return res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    console.error("Error Creating Post", err);
    res.status(500).json({ message: "Server Error" });
  }
});


router.put('/:id', authenticateToken, uploadPost.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, caption, description } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "You can only edit your own posts" });
    }

    // Update text fields
    if (title) post.title = title;
    if (caption) post.caption = caption;
    if (description) post.description = description;

    // Upload new image (if given)
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "post_images",
      });
      post.imageURL = result.secure_url;
      fs.unlinkSync(req.file.path); // Clean up local file
    }

    await post.save();
    res.status(200).json({ message: "Post updated", post });

  } catch (err) {
    console.error("Error updating post: ", err);
    res.status(500).json({ message: "Server Error" });
  }
});


router.delete('/:id', authenticateToken, async(req,res) => {            //Delete Post
    try{
        const {id} = req.params;

        const post = await Post.findById(id);

        if(!post){
            return res.status(404).json({message: "Post not found"});
        }

        if(post.author.toString() !== req.user.userId){
            return res.status(403).json({message: "You can only delete your own posts"});
        }

        await post.deleteOne();   
        res.status(200).json({message: "Post deleted", post});
    }
    catch(err){
        console.error("Error deleting post: ",err);
        res.status(500).json({message: "Server Error"});
    }
});


router.get('/', async(req,res) => {                             //Get All Existing Posts  -- for recommended page
    try{

        let { page =1 , limit = 20} = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        const totalPosts = await Post.countDocuments();
        const posts = await Post.find()
        .populate('author','profile_name email comments')
        .sort({createdAt: -1})
        .skip((page - 1) * limit)
        .limit(limit);

        res.status(200).json({posts, currentPage: page, totalPages: Math.ceil(totalPosts/limit), totalPosts});
    }
    catch(err){
        console.error("Error fetching posts: ",err);
        res.status(500).json({message: "Server Error"});
    }
});

router.get('/interacted-posts', authenticateToken, async (req, res) => {
  try {
    const currentUser = await user.findById(req.user.userId);

    if (!currentUser || !Array.isArray(currentUser.interactions)) {
      return res.status(200).json({ posts: [] }); // No interactions, no posts
    }

    const posts = await Post.find({
      author: { $in: currentUser.interactions }
    })
      .populate('author', 'profile_name username profilePic comments')
      .sort({ createdAt: -1 });

    res.status(200).json({ posts });
  } catch (err) {
    console.error("Failed to fetch interacted posts:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get('/:id', async(req,res) => {                          //Open details of a particular post
    try{

        const {id} = req.params;
        const post = await Post.findById(id)
        .populate('author','profile_name email profilePic _id')
        .populate('comments.user', 'profile_name email profilePic')
        .populate('likes', 'profile_name profilePic');

        if(!post){
            return res.status(404).json({message: "Post not found"});
        }

        const totalLikes = post.likes.length;
        const totalComments = post.comments.length;

        res.status(200).json({post, totalLikes, totalComments});
    }
    catch(err){
        console.error("Error fetching post: ",err);
        res.status(500).json({message: "Server Error"});
    }
});


router.post('/:id/like', authenticateToken, async(req,res) => {         // Like / Unlike Button API
    try{

        const {id} = req.params;
        const userId = req.user.userId;

        const post = await Post.findById(id);
        if(!post){
            return res.status(404).json({message: "Post not found"});
        }

        const alreadyLiked = post.likes.includes(userId);
        if(alreadyLiked){
            post.likes = post.likes.filter(uid => uid.toString() !== userId);
        }
        else{
            post.likes.push(userId);
        }

        await post.save();
        res.status(200).json({message: alreadyLiked? "Post unliked" : "Post liked", totalLikes: post.likes.length});

    }   
    catch(err){
        console.error("Error toggling like ",err);
        res.status(500).json({message:"Server Error"});
    }
});


router.post('/:id/comment', authenticateToken, async(req,res) => {              //Add comment to Post
    try {
        const { id } = req.params;
        const { text } = req.body;

        if (!text || text.trim() === "") {
            return res.status(400).json({ message: "Comment text is required" });
        }

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const newComment = {
            user: req.user.userId,
            text,
            timeStamp: new Date()
        };

        post.comments.push(newComment);
        await post.save();

        res.status(201).json({ message: "Comment added", comment: newComment });

    } catch(err) {
        console.error("Error commenting ", err);
        res.status(500).json({ message: "Server Error" });
    }
});


router.get('/user/:userId', async(req,res) => {                         //Get all post of a particular user 
    try{

        const {userId} = req.params;

        const userPosts = await Post.find({author:userId})
        .populate('author','profile_name email')
        .sort({createdAt: -1});

        res.status(200).json({posts: userPosts});
    }
    catch(err){
        console.error("Error fetching posts: ",err);
        res.status(500).json({message: "Server Error"});
    }
});


router.put('/:postId/comments/:commentId', authenticateToken, async(req,res) => {           //Edit Comment
    try{
        const {postId,commentId} = req.params;
        const {comment} = req.body;

        if(!comment){
            return res.status(400).json({message:"Comment text is required"});
        }

        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({message:"Post not Found"});
        }

        const commentToEdit = post.comments.id(commentId);
        if(!commentToEdit){
            return res.status(404).json({message:"Comment not found"});
        }

        if(commentToEdit.user.toString() !== req.user.userId){
            return res.status(403).json({message:"You can only edit your own comments"});
        }

        commentToEdit.text = comment;
        await post.save();

        res.status(200).json({message:"Comment updated successfully"});
    }
    catch(err){
        console.error("Error editing comment ", err);
        res.status(500).json({message:"Server Error"});
    }
});


router.delete('/:postId/comments/:commentId', authenticateToken, async(req,res) => {            //Delete Comment
    try{
        const {postId,commentId} = req.params;

        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({message:"Post not Found"});
        }

        const commentToDelete = post.comments.id(commentId);
        if(!commentToDelete){
            return res.status(404).json({message:"Comment not found"});
        }

        if(commentToDelete.user.toString() !== req.user.userId){
            return res.status(403).json({message:"You can only delete your own comments"});
        }

        commentToDelete.deleteOne();
        await post.save();

        res.status(200).json({message:"Comment deleted successfully"});
    }
    catch(err){
        console.error("Error deleting comment ", err);
        res.status(500).json({message:"Server Error"});
    }
});

module.exports = router;
