const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// sign up
router.post("/signup", userController.sign_up);

// login
router.post("/login", userController.log_in);

// get users
router.post("/non_friends_users", userController.get_non_friends_user);

// get profile page user
router.get("/:userId", userController.get_user);

// get friends list
router.post("/friends", userController.get_friends);

// get friends requests list
router.post("/friends_requests", userController.get_friends_requests);

// add friend
router.post("/add_friend", userController.add_friend);

module.exports = router;
