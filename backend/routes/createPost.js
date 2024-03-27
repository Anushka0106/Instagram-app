const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const POST = mongoose.model("POST");

// GET route to fetch all posts
router.get("/allposts", requireLogin, async (req, res) => {
    try {
        const posts = await POST.find().populate("postedBy", "_id name");
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// POST route to create a new post
router.post("/createPost", requireLogin, async (req, res) => {
    const { body, pic } = req.body;

    if (!body || !pic) {
        return res.status(422).json({ error: "Please add all the fields" });
    }

    const post = new POST({
        body,
        photo: pic,
        postedBy: req.user
    });

    try {
        const result = await post.save();
        res.json({ post: result });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// GET route to fetch posts created by the logged-in user
router.get("/myposts", requireLogin, async (req, res) => {
    try {
        const posts = await POST.find({ postedBy: req.user._id }).populate("postedBy", "_id name");
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// PUT route to like a post
router.put("/like", requireLogin, async (req, res) => {
    try {
        const result = await POST.findByIdAndUpdate(req.body.postId, {
            $push: { likes: req.user._id }
        }, { new: true }).populate("postedBy", "_id name Photo");
        res.json(result);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
});

// PUT route to unlike a post
router.put("/unlike", requireLogin, async (req, res) => {
    try {
        const result = await POST.findByIdAndUpdate(req.body.postId, {
            $pull: { likes: req.user._id }
        }, { new: true }).populate("postedBy", "_id name Photo");
        res.json(result);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
});


router.put("/comments", requireLogin, async (req, res) => {
    try {
      const { text, postId } = req.body;
      if (!text || !postId) {
        return res.status(400).json({ error: "Invalid request body" });
      }
  
      const comment = {
        comment: text,
        postedBy: req.user._id
      };
  
      const updatedPost = await POST.findByIdAndUpdate(
        postId,
        { $push: { comments: comment } },
        { new: true }
      ).populate("comments.postedBy", "_id name");
  
      if (!updatedPost) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      res.json(updatedPost);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
module.exports = router;
