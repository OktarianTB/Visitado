const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: [true, "An account with this username already exists."],
      minlength: [4, "Username must be 4-15 characters."],
      maxlength: [15, "Username must be 4-15 characters."],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    displayName: {
      type: String,
      required: [true, "Display name is required."],
      minlength: [4, "Display name must be 4-15 characters."],
      maxlength: [15, "Display name must be 4-15 characters."],
    },
    biography: {
      type: String,
      default: "Welcome to my page!",
      maxlength: 200,
    },
    picture_url: {
      type: String,
      default: "koala.png",
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
