const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const errorMessage = (next, message) => {
  next(createError(400, message));
};

exports.registerUser = async (req, res, next) => {
  try {
    const { username, password, displayName } = req.body;
    console.log(username, password, displayName);

    if (!username || !password || !displayName) {
      return errorMessage(next, "Not all fields have been entered.");
    }
    if (password.length < 6 || password.length > 25) {
      return errorMessage(next, "Password must be between 6-25 characters.");
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return errorMessage(
        next,
        "An account with this username already exists."
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
      displayName,
    });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    return errorMessage(next, error.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return errorMessage(next, "Fields missing.");
    }

    const user = await User.findOne({ username });

    if (!user) {
      return errorMessage(next, "Invalid credentials. Please try again.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorMessage(next, "Invalid credentials. Please try again.");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    return errorMessage(next, error.message);
  }
};

exports.validate = async (req, res) => {
  try {
    const token = req.header("x-auth-token");

    if (!token) {
      return res.json(false);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json(false);
    }

    const user = await User.findById(verified.id);
    if (!user) {
      return res.json(false);
    }

    return res.json(true);
  } catch (error) {
    return res.json(false);
  }
};
