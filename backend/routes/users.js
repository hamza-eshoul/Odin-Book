const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

// #1 Auth

// sign up
router.post("/signup", userController.sign_up);

// login
router.post("/login", userController.log_in);

// require auth middleware

router.use(requireAuth);

// #2 User Friends

// get friends list
router.get("/:user_id/friends", userController.get_friends);

// get non friend list
router.get("/:user_id/non_friends", userController.get_non_friends);

// get incoming friends requests
router.get(
  "/:user_id/incoming_friend_requests",
  userController.get_incoming_friend_requests
);

// get sent friends requests
router.get(
  "/:user_id/sent_friend_requests",
  userController.get_sent_friend_requests
);

// send friend request
router.post("/send_friend_request", userController.send_friend_request);

// cancel friend request
router.post("/cancel_friend_request", userController.cancel_friend_request);

// accept friend request
router.post("/accept_friend_request", userController.accept_friend_request);

// reject friend request
router.post("/reject_friend_request", userController.reject_friend_request);

// delete friend
router.delete("/friends/:friend_id", userController.delete_friend);

// #3 Users & Profile

// get users
router.get("/", userController.get_users);

// get profile page user
router.get("/:user_id", userController.get_user);

// update profile data
router.put("/profile_data", userController.update_profile_data);

// update profile image
router.put("/profile_image", userController.update_profile_image);

// update profile cover image
router.put("/profile_cover_image", userController.update_profile_cover_image);

module.exports = router;
