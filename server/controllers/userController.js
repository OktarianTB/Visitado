const User = require("../models/userModel");
const createError = require("http-errors");

const errorMessage = (next, message) => {
  next(createError(400, message));
};

exports.getUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

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
        location: user.location,
      },
    });
  } catch (error) {
    return errorMessage(next, error.message);
  }
};

exports.getFullUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

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
        id: user._id,
        location: user.location,
      },
    });
  } catch (error) {
    return errorMessage(next, error.message);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { displayName, biography, location, picture_url } = req.body;

    if (!displayName || !biography || !location || !picture_url) {
      return errorMessage(next, "Not all required fields have been entered.");
    }

    const updatedInfo = {
      displayName,
      biography,
      location,
      picture_url,
    };

    const updatedUser = await User.findByIdAndUpdate(req.userId, updatedInfo, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      status: "success",
      data: {
        username: updatedUser.updatedUsername,
        displayName: updatedUser.displayName,
        biography: updatedUser.biography,
        picture_url: updatedUser.picture_url,
        id: updatedUser._id,
        location: updatedUser.location,
      },
    });
  } catch (error) {
    return errorMessage(next, error.message);
  }
};

/*
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
*/
