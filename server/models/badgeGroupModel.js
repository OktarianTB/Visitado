const mongoose = require("mongoose");

const badgeGroupSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
    minlength: [2, "Title must be at least 2 characters."],
  },
  thumbnail: {
    type: String,
    required: [true, "Thumbnail is required."],
    default: "koala.png",
  },
  priority: {
    type: Number,
    default: 10,
  },
});

const BadgeGroup = mongoose.model("BadgeGroup", badgeGroupSchema);
module.exports = BadgeGroup;
