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
