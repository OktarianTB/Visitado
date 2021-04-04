const mongoose = require("mongoose");

const obtainedBadgeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User is required."],
    },
    badge: {
      type: mongoose.Schema.ObjectId,
      ref: "Badge",
      required: [true, "Badge is required."],
    },
  },
  {
    timestamps: true,
  }
);

obtainedBadgeSchema.index({ userId: 1, badge: 1 }, { unique: true });

const ObtainedBadge = mongoose.model("ObtainedBadge", obtainedBadgeSchema);
module.exports = ObtainedBadge;
