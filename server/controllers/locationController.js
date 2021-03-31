const Location = require("../models/locationModel");
const User = require("../models/userModel");
const createError = require("http-errors");

const errorMessage = (next, message) => {
  next(createError(400, message));
};

exports.getLocationsForUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return errorMessage(next, "This user does not exist.");
    }

    const user = await User.findById(userId);

    if (!user) {
      return errorMessage(next, "This user does not exist.");
    }

    const locations = await Location.find({ user: userId });

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
