const mongoose = require("mongoose");

const followsSchema = new mongoose.Schema(
  {
    user_following: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User is required."],
    },
    user_followed: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User is required."],
    },
  },
  {
    timestamps: true,
  }
);

followsSchema.index({ user_following: 1, user_followed: 1 }, { unique: true });

const Follows = mongoose.model("Follows", followsSchema);

module.exports = Follows;
