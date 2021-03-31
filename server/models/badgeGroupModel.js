const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const badgeGroupSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
    minlength: [2, "Title must be at least 2 characters."],
  },
  slug: { type: String, slug: 'title', slugPaddingSize: 1, unique: true },
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
