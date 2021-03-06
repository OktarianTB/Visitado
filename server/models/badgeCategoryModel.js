const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const badgeCategorySchema = new mongoose.Schema({
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
  badge_group: {
    type: mongoose.Schema.ObjectId,
    ref: "BadgeGroup",
    required: [true, "Badge Category must be associated to a Badge Group."],
  },
});

const BadgeCategory = mongoose.model("BadgeCategory", badgeCategorySchema);
module.exports = BadgeCategory;
