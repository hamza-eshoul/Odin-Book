const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// #1 Posts

router.get("/", postController.get_posts);

router.post("/create", postController.create_post);

router.get("/:post_id", postController.get_post);

router.get("/profile_posts/:profile_id", postController.get_profile_posts);

router.put("/update_likes", postController.update_post_likes);

router.delete("/delete_post", postController.delete_post);

// #2 Posts Comments

router.get("/comments/:post_id", postController.fetch_post_comments);

router.post("/comments/add_comment", postController.add_post_comment);

router.put("/comments/update_comment", postController.update_post_comment);

router.delete("/comments/delete_comment", postController.delete_post_comment);

module.exports = router;
