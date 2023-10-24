const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// #1 Auth

// sign up
router.post("/signup", userController.sign_up);

// login
router.post("/login", userController.log_in);

// #2 Friends

// get non friend users
router.get("/non_friends_users/:user_id", userController.get_non_friends_users);

// get friends list
router.get("/friends/:user_id", userController.get_friends);

// get limited friends list
router.post("/limited_friends", userController.get_limited_friends);

// get incoming friends requests
router.get(
  "/incoming_friends_requests/:user_id",
  userController.get_incoming_friends_requests
);

// get sent friends requests
router.get(
  "/sent_friends_requests/:user_id",
  userController.get_sent_friends_requests
);

// cancel friend request
router.post("/cancel_friend_request", userController.cancel_friend_request);

// send friend request
router.post("/send_friend_request", userController.send_friend_request);

// accept friend request
router.post("/accept_friend_request", userController.accept_friend_request);

// reject friend request
router.post("/reject_friend_request", userController.reject_friend_request);

// remove friend
router.delete("/delete_friend", userController.delete_friend);

// #2 Users & Profile

// get users
router.get("/", userController.get_users);

// get profile page user
router.get("/:user_id", userController.get_user);

// update user profile data
router.put("/update_profile_data", userController.update_profile_data);

// update user profile image
router.put("/update_profile_image", userController.update_profile_image);

// update user cover image
router.put("/update_cover_image", userController.update_user_cover_image);

module.exports = router;
