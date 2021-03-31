const User = require("../models/userModel");
const Post = require("../models/postModel");
const createError = require("http-errors");

const errorMessage = (next, message) => {
  next(createError(400, message));
};

exports.getPostsForUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return errorMessage(next, "This user does not exist.");
    }

    const user = await User.findById(userId);

    if (!user) {
      return errorMessage(next, "This user does not exist.");
    }

    const posts = await Post.find({ user: userId });

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
    const { title, content, activity, image_url, location, badge } = req.body;

    if (!title || !content) {
      return errorMessage(next, "Not all required fields have been entered.");
    }

    const newPost = new Post({
      title,
      content,
      user: req.userId,
      activity,
      image_url,
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
