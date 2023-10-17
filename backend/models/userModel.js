const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    profileImg: {
      public_id: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },
    coverImg: {
      public_id: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: false,
    },
    education: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    sent_friends_requests: {
      type: Array,
      required: true,
    },
    incoming_friends_requests: {
      type: Array,
      required: true,
    },
    friends_ids: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
