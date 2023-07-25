const validator = require("validator");
const bcryptjs = require("bcryptjs");
const User = require("../models/userModel");

exports.sign_up = async (req, res) => {
  // signup logic
  const signup = async (
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  ) => {
    // #1 firstName lastName, Email and password validation (form fields)

    // Check if form fields exist
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      throw Error("All fields must be filled");
    }

    // check if email is a valid email
    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }

    // check if password is strong enough
    if (
      !validator.isStrongPassword(password, {
        minLength: 6,
        minNumbers: 0,
        minSymbols: 0,
      })
    ) {
      throw Error(
        "Password must at least contain 6 characters and one uppercase letter"
      );
    }

    // check if password and confirmPassword match
    if (password !== confirmPassword) {
      throw Error("The passwords must match");
    }

    // #2 DB result validation

    // Check if user exists in the database
    const exists = await User.findOne({ email });

    if (exists) {
      throw Error("The email is already used by another user.");
    }

    // #3 DB security
    // hashing the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // #4 Add user to DB
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();

    return user;
  };

  // desctructure form body fields
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    // run the signup logic and create user if the logic succeeds
    const user = await signup(
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    );

    // send user info as json
    res.status(200).json({ ...user._doc, password: null });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.log_in = async (req, res) => {
  // login logic
  const login = async (email, password) => {
    // #1 Email and password validation (form fields)

    // check if email or password are empty
    if (!email || !password) {
      throw Error("All fields must be filled");
    }

    // #2 DB result validation

    // check if user does not exists
    const user = await User.findOne({ email });

    if (!user) {
      throw Error("Incorrect email");
    }

    // check if password is correct
    const match = await bcryptjs.compare(password, user.password);

    if (!match) {
      throw Error("Incorrect password");
    }

    return user;
  };

  // desctructure form body fields
  const { email, password } = req.body;

  try {
    // run the login logic and log the user in if the logic succeeds
    const user = await login(email, password);

    // send user info as json
    res.status(200).json({ ...user._doc, password: null });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.get_non_friends_user = async (req, res) => {
  const { user_and_friends_ids } = req.body;

  try {
    // fetch all non-friends users
    const users = await User.find({ _id: { $nin: user_and_friends_ids } });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.get_user = async (req, res) => {
  const { userId } = req.params;

  try {
    // fetch uer
    const user = await User.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.get_friends = async (req, res) => {
  const { userFriends_ids } = req.body;

  try {
    // fetch all user friends
    const userFriends = await User.find({ _id: { $in: userFriends_ids } });

    res.status(200).json(userFriends);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.get_friends_requests = async (req, res) => {
  const { sent_friends_requests, incoming_friends_requests } = req.body;

  try {
    // fetch all sent friends requests
    const sentFriendsRequests = await User.find({
      _id: { $in: sent_friends_requests },
    });

    // fetch all incoming friends requests
    const incomingFriendsRequests = await User.find({
      _id: { $in: incoming_friends_requests },
    });
    res.status(200).json({ sentFriendsRequests, incomingFriendsRequests });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.add_friend_request = async (req, res) => {
  const { user_id, friend_id } = req.body;

  try {
    // Find the logged in user and update his sent friends requests
    const user = await User.findByIdAndUpdate(
      user_id,
      {
        $push: { sent_friends_requests: friend_id },
      },
      { new: true }
    );

    // Find the added friend and update his incoming friends requests
    const addedFriend = await User.findByIdAndUpdate(friend_id, {
      $push: { incoming_friends_requests: user_id },
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.essage });
  }
};

exports.cancel_friend_request = async (req, res) => {
  const { user_id, friend_id, userSentRequests } = req.body;

  // filter user sent requests array
  const filterSentRequests = userSentRequests.filter(
    (request) => request !== friend_id
  );

  // get friend's incoming requests array
  const friendIncomingRequests = await User.findById(friend_id, {
    incoming_friends_requests: 1,
    _id: 0,
  });

  // filter friend incoming requests array
  const filtereIncomingRequests =
    friendIncomingRequests.incoming_friends_requests.filter(
      (request) => request !== user_id
    );

  try {
    // find user and update his sent_friends_requests field
    const updateUser = await User.findByIdAndUpdate(
      user_id,
      {
        $set: {
          sent_friends_requests: filterSentRequests,
        },
      },
      {
        new: true,
      }
    );
    // find friend and update his incoming_friend_requests field
    const updateFriend = await User.findByIdAndUpdate(
      friend_id,
      {
        $set: {
          incoming_friends_requests: filtereIncomingRequests,
        },
      },
      { new: true }
    );

    res.status(200).json(updateUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.accept_friend_request = async (req, res) => {
  const { user_id, friend_id, userIncomingRequests } = req.body;

  // filter user incoming requests fields
  const filterIncomingRequests = userIncomingRequests.filter(
    (request) => request !== friend_id
  );

  // get friend's sent requests array
  const friendSentRequests = await User.findById(friend_id, {
    sent_friends_requests: 1,
    _id: 0,
  });

  // filter friend sent request fields
  const filterSentRequests = friendSentRequests.sent_friends_requests.filter(
    (request) => request !== user_id
  );

  try {
    // find user and update his friends and incoming requests fields
    const updateUser = await User.findByIdAndUpdate(
      user_id,
      {
        $set: { incoming_friends_requests: filterIncomingRequests },
        $push: {
          friends_ids: friend_id,
        },
      },
      { new: true }
    );

    // find friend and update his friends and sent request felds
    const updateFriend = await User.findByIdAndUpdate(
      friend_id,
      {
        $set: { sent_friends_requests: filterSentRequests },
        $push: {
          friends_ids: user_id,
        },
      },
      { new: true }
    );

    res.status(200).json(updateUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.reject_friend_request = async (req, res) => {
  const { user_id, friend_id, userIncomingRequests } = req.body;

  // filter user incoming requests field
  const filterIncomingRequests = userIncomingRequests.filter(
    (request) => request !== friend_id
  );

  // get friend's sent requests array
  const friendSentRequests = await User.findById(friend_id, {
    sent_friends_requests: 1,
    _id: 0,
  });

  // filter friend sent request fields
  const filterSentRequests = friendSentRequests.sent_friends_requests.filter(
    (request) => request !== user_id
  );

  try {
    // find user and update his incoming requests field only
    const updateUser = await User.findByIdAndUpdate(
      user_id,
      {
        $set: {
          incoming_friends_requests: filterIncomingRequests,
        },
      },
      { new: true }
    );
    // find friend and update his sent request field only.
    const updateFriend = await User.findByIdAndUpdate(
      friend_id,
      {
        $set: {
          sent_friends_requests: filterSentRequests,
        },
      },
      { new: true }
    );

    res.status(200).json(updateUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
