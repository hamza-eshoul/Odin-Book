const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// create post
router.post("/create", postController.create_post);

// get 10 recent posts
router.get("/recent_posts", postController.get_recent_posts);

module.exports = router;
