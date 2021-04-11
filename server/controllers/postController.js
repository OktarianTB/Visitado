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

    const posts = await Post.find({ user: user._id })
      .sort("-createdAt")
      .limit(5)
      .populate({ path: "badge", select: "title" })
      .populate({ path: "location", select: "name" })
      .populate({ path: "user", select: "username picture_url" });

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

exports.getPostFeed = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .sort("-createdAt")
      .limit(15)
      .populate({ path: "badge", select: "title" })
      .populate({ path: "location", select: "name" })
      .populate({ path: "user", select: "username picture_url" });

    res.status(200).json({
      status: "success",
      data: posts,
    });
  } catch (error) {
    return errorMessage(next, error.message);
  }
};
