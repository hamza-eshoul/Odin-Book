const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// sign up
router.post("/signup", userController.sign_up);

// login
router.post("/login", userController.log_in);

// get non friend users
router.post("/non_friends_users", userController.get_non_friends_user);

// get profile page user
router.get("/:userId", userController.get_user);

// get friends list
router.post("/friends", userController.get_friends);

// get limited friends list
router.post("/limited_friends", userController.get_limited_friends);

// get friends requests list
router.post("/friends_requests", userController.get_friends_requests);

// cancel friend request
router.post("/cancel_friend_request", userController.cancel_friend_request);

// add friend
router.post("/add_friend", userController.add_friend_request);

// accept friend request
router.post("/accept_request", userController.accept_friend_request);

// reject friend request
router.post("/reject_request", userController.reject_friend_request);

// remove friend
router.put("/unfriend", userController.remove_friend);

// update user profile info
router.put("/user_info", userController.update_user_info);

// update user profile image
router.put("/update_image", userController.update_user_image);

// update user cover image
router.put("/update_cover_image", userController.update_user_cover_image);

module.exports = router;
