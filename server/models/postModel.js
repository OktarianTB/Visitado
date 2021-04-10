const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      minlength: [5, "Title must be more 5-100 characters."],
      maxLength: [100, "Title must be more 5-100 characters."],
    },
    content: {
      type: String,
      required: [true, "Content is required."],
      minlength: [20, "Content must be more 20-500 characters."],
      maxLength: [500, "Content must be more 20-500 characters."],
    },
    activity: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    location: {
      type: mongoose.Schema.ObjectId,
      ref: "Location",
    },
    badge: {
      type: mongoose.Schema.ObjectId,
      ref: "Badge",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Post must be associated to a user."],
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
