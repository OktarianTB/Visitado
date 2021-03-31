const User = require("../models/userModel");
const Follows = require("../models/followsModel");
const createError = require("http-errors");

const errorMessage = (next, message) => {
  next(createError(400, message));
};

exports.getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return errorMessage(next, "This user does not exist.");
    }

    const user = await User.findById(userId);

    if (!user) {
      return errorMessage(next, "This user does not exist.");
    }

    res.status(200).json({
      status: "success",
      data: {
        username: user.username,
        displayName: user.displayName,
        biography: user.biography,
        picture_url: user.picture_url,
      },
    });
  } catch (error) {
    return errorMessage(next, error.message);
  }
};

exports.followUser = async (req, res, next) => {
  try {
    const { followUserId } = req.params;

    if (!followUserId.match(/^[0-9a-fA-F]{24}$/)) {
      return errorMessage(
        next,
        "The user you are trying to follow does not exist."
      );
    }

    const followUser = await User.findById(userId);

    if (!followUser) {
      return errorMessage(
        next,
        "The user you are trying to follow does not exist."
      );
    }

    const newFollow = new Follow({
      user_following: req.userId,
      user_followed: followUserId,
    });

    await newFollow.save();

    res.status(200).json({
      status: "success",
      data: {
        user_following: req.userId,
        user_followed: followUserId,
      },
    });
  } catch (error) {
    return errorMessage(next, error.message);
  }
};
