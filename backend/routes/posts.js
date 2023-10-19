const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// get posts
router.get("/", postController.get_posts);

// create post
router.post("/create", postController.create_post);

// get individual post
router.get("/:post_id", postController.get_post);

// get profile page user posts
router.get("/user_posts/:user_id", postController.get_user_posts);

// create comment
router.post("/create_comment", postController.create_comment);

// fetch post comments
router.post("/comments", postController.fetch_post_comments);

// update post likes
router.put("/likes", postController.update_post_likes);

module.exports = router;
