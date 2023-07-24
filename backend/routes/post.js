const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// create post
router.post("/create", postController.create_post);

// get 10 recent posts
router.get("/recent_posts", postController.get_recent_posts);

// get individual post
router.get("/:post_id", postController.get_post);

// create comment
router.post("/create_comment", postController.create_comment);

// fetch post comments
router.post("/comments", postController.fetch_post_comments);

// update post likes
router.put("/likes", postController.update_post_likes);

module.exports = router;
