const mongoose = require("mongoose");
require("mongoose-type-email");

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
    email: {
      type: mongoose.SchemaTypes.Email,
      required: [true, "Email is required."],
      unique: [true, "An account with this email already exists."],
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
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
