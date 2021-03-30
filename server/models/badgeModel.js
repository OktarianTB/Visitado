const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
    minlength: [2, "Title must be at least 2 characters."],
  },
  description: {
    type: String,
  },
  wikipedia_url: {
    type: String,
  },
  badge_category: {
    type: mongoose.Schema.ObjectId,
    ref: "BadgeCategory",
    required: [true, "Badge must be associated to a Badge Category."],
  },
  location: {
    type: mongoose.Schema.ObjectId,
    ref: "Location",
    required: [true, "Badge must be associated to a Location."],
  },
});

const Badge = mongoose.model("Badge", badgeSchema);
module.exports = Badge;
