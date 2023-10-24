const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const validator = require("validator");

const validateSignupForm = (firstName, lastName, email, password) => {
  // Check if form fields exist
  if (!firstName || !lastName || !email || !password) {
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
};

const checkUserExists = async (email) => {
  const exists = await User.findOne({ email });

  if (exists) {
    throw Error("The email is already used by another user.");
  }
};

const hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};

const addUserDb = async (firstName, lastName, email, hashedPassword) => {
  const user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  await user.save();

  return user;
};

const signup = async (firstName, lastName, email, password) => {
  validateSignupForm(firstName, lastName, email, password);

  await checkUserExists(email);

  const hashedPassword = await hashPassword(password);

  const user = await addUserDb(firstName, lastName, email, hashedPassword);

  return user;
};

module.exports = signup;
