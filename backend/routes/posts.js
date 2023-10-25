const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const requireAuth = require("../middleware/requireAuth");

// require auth for all posts routes
router.use(requireAuth);

// #1 Posts

router.get("/", postController.get_posts);

router.get("/:id", postController.get_post);

router.get("/profile_posts/:profile_id", postController.get_profile_posts);

router.post("/", postController.create_post);

router.delete("/:id", postController.delete_post);

router.put("/:id/post_likes", postController.update_post_likes);

// #2 Posts Comments

router.get("/:post_id/comments", postController.fetch_post_comments);

router.post("/:post_id/comments", postController.add_post_comment);

router.put("/comments/:comment_id", postController.update_post_comment);

router.delete("/comments/:comment_id", postController.delete_post_comment);

module.exports = router;
