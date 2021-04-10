const User = require("../models/userModel");
const Post = require("../models/postModel");
const createError = require("http-errors");

const errorMessage = (next, message) => {
  next(createError(400, message));
};

exports.getPostsForUser = async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) {
      return errorMessage(next, "This user does not exist.");
    }

    const posts = await Post.find({ user: user._id }).populate("badge");

    res.status(200).json({
      status: "success",
      data: posts,
    });
  } catch (error) {
    return errorMessage(next, error.message);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, content, activity, images, location, badge } = req.body;

    if (!title || !content) {
      return errorMessage(next, "Not all required fields have been entered.");
    }

    const newPost = new Post({
      type: "post",
      title,
      content,
      user: req.userId,
      activity,
      images,
      location,
      badge,
    });
    const savedPost = await newPost.save();

    res.status(201).json({
      status: "success",
      data: savedPost,
    });
  } catch (error) {
    return errorMessage(next, error.message);
  }
};
