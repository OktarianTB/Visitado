const mongoose = require("mongoose");

const visitedLocationSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User is required."],
    },
    location: {
      type: mongoose.Schema.ObjectId,
      ref: "Location",
      required: [true, "Location is required."],
    },
  },
  {
    timestamps: true,
  }
);

visitedLocationSchema.index({ username: 1, location: 1 }, { unique: true });

const VisitedLocation = mongoose.model(
  "VisitedLocation",
  visitedLocationSchema
);
module.exports = VisitedLocation;
