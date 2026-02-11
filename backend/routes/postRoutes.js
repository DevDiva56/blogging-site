const express = require("express");
const BlogPost = require("../models/BlogPost");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload")

const router = express.Router();


//Getting Multiple Posts
router.get("/", async (req, res) => {
  try {
    const posts = await BlogPost.find().populate("author", "username")
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts", message: "Server Error" })
  }
})

//Getting one Post
router.get("/:id", async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate("author", "username")
    if (!post) return res.status(404).json({ message: "Post not found" })
    res.json(post)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch post"});
  }
})

//Creating a Post
router.post("/", auth, upload.single("image"), async (req, res) =>  {
  try {
    const { title, subtitle, content, imageUrl } = req.body;
    const post = new BlogPost({
      title,
      subtitle,
      content,
       imageUrl: req.file ? req.file.path : "",
      author: req.user.id
    })
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: "Failed to create post"});
  }
})

// LIKE / UNLIKE POST
router.post("/:id/like", auth, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.user.id;

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.json({
      likesCount: post.likes.length,
      liked: !alreadyLiked,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to like post" });
  }
});

// ADD COMMENT
router.post("/:id/comment", auth, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({
      user: req.user.id,
      text,
    });

    await post.save();

    await post.populate("comments.user", "username");

    res.status(201).json(post.comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment" });
  }
});

// Updating a post
router.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Only the author can update
    if (post.author.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    const { title, subtitle, content } = req.body;
    post.title = title || post.title;
    post.subtitle = subtitle || post.subtitle;
    post.content = content || post.content;

    // Update image if a new file is uploaded
    if (req.file) {
      post.imageUrl = req.file.path;
    }

    await post.save();
    res.json(post);
  } catch (error) {
    console.log("PUT /posts/:id ERROR:", error);
    res.status(400).json({ message: "Failed to update post" });
  }
})

// Deleting a post

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    console.log("Post found:", post);
    console.log("Logged-in user ID:", req.user.id);

    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    await post.deleteOne()

    res.json({ message: "Post deleted" });
  } catch (error) {
    console.log("DELETE ERROR:", error);
    res.status(500).json({ message: "Failed to delete post" });
  }
})



module.exports = router;
