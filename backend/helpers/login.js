const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");

const validateLoginForm = async (email, password) => {
  // check if email or password are empty
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
};

const checkUserExists = async (email) => {
  // check if user does not exists
  const user = await User.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  return user;
};

const checkPasswordMatch = async (user, password) => {
  const match = await bcryptjs.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }
};

const login = async (email, password) => {
  validateLoginForm(email, password);

  const user = await checkUserExists(email);

  await checkPasswordMatch(user, password);

  return user;
};

module.exports = login;
