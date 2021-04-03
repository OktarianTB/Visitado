const Location = require("../models/locationModel");
const User = require("../models/userModel");
const Badge = require("../models/badgeModel");
const createError = require("http-errors");

const errorMessage = (next, message) => {
  next(createError(400, message));
};

exports.getLocationsForUser = async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) {
      return errorMessage(next, "This user does not exist.");
    }

    const locations = await Location.find({ user: user._id });

    const processedLocations = locations.map((location) => {
      return {
        coordinates: location.location.coordinates,
        name: location.name,
        _id: location._id,
      };
    });

    res.status(200).json({
      status: "success",
      data: processedLocations,
    });
  } catch (error) {
    return errorMessage(next, error.message);
  }
};

exports.addLocationToUser = async (req, res, next) => {
  try {
    const { name, location } = req.body;

    if (!name || !location) {
      return errorMessage(next, "Not all fields have been entered.");
    }

    const newLocation = new Location({
      name,
      location,
      user: req.userId,
    });
    const savedLocation = await newLocation.save();

    res.status(201).json({
      status: "success",
      data: savedLocation,
    });
  } catch (error) {
    return errorMessage(next, error.message);
  }
};

exports.addLocation = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || !user.is_admin) {
      return errorMessage(next, "Permission denied.");
    }

    const { name, location } = req.body;

    if (!name || !location) {
      return errorMessage(next, "Not all fields have been entered.");
    }

    const newLocation = new Location({
      name,
      location,
    });
    const savedLocation = await newLocation.save();

    res.status(201).json({
      status: "success",
      data: savedLocation,
    });
  } catch (error) {
    return errorMessage(next, error.message);
  }
};

exports.getLocationsForBadges = async (req, res, next) => {
  try {
    const locations = await Badge.find({
      location: { $exists: true },
    }).populate("location");

    res.status(201).json({
      status: "success",
      data: locations,
    });
  } catch (error) {
    return errorMessage(next, error.message);
  }
};
