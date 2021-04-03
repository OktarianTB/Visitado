const BadgeGroup = require("../models/badgeGroupModel");
const BadgeCategory = require("../models/badgeCategoryModel");
const Badge = require("../models/badgeModel");
const User = require("../models/userModel");
const createError = require("http-errors");

const errorMessage = (next, message) => {
  next(createError(400, message));
};

exports.getBadgeGroups = async (req, res, next) => {
  try {
    const badgeGroups = await BadgeGroup.find().sort({ priority: "asc" });

    res.status(200).json({
      status: "success",
      data: badgeGroups,
    });
  } catch (error) {
    return errorMessage(next, error.message);
  }
};

exports.createBadgeGroup = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || !user.is_admin) {
      return errorMessage(next, "Permission denied.");
    }

    const { title, thumbnail, priority } = req.body;

    if (!title || !thumbnail || !priority) {
      return errorMessage(next, "Not all fields have been entered.");
    }

    const newBadgeGroup = new BadgeGroup({
      title,
      thumbnail,
      priority,
    });
    const savedBadgeGroup = await newBadgeGroup.save();

    res.status(201).json({
      status: "success",
      data: savedBadgeGroup,
    });
  } catch (error) {
    return errorMessage(next, error.message);
  }
};

exports.getBadgeCategories = async (req, res, next) => {
  try {
    const { badgeGroup } = req.params;

    const group = await BadgeGroup.findOne({ slug: badgeGroup });

    if (!group) {
      return errorMessage(next, "This badge group does not exist.");
    }

    const badgeCategories = await BadgeCategory.find({
      badge_group: group._id,
    }).sort({ priority: "asc" });

    res.status(200).json({
      status: "success",
      badgeGroup: group.title,
      data: badgeCategories,
    });
  } catch (error) {
    return errorMessage(next, error.message);
  }
};

exports.createBadgeCategory = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || !user.is_admin) {
      return errorMessage(next, "Permission denied.");
    }

    const { title, thumbnail, priority, badge_group } = req.body;

    if (!title || !thumbnail || !priority || !badge_group) {
      return errorMessage(next, "Not all fields have been entered.");
    }

    const newBadgeCategory = new BadgeCategory({
      title,
      thumbnail,
      priority,
      badge_group,
    });
    const savedBadgeCategory = await newBadgeCategory.save();

    res.status(201).json({
      status: "success",
      data: savedBadgeCategory,
    });
  } catch (error) {
    return errorMessage(next, error.message);
  }
};

exports.getBadges = async (req, res, next) => {
  try {
    const { badgeGroup, badgeCategory } = req.params;

    const group = await BadgeGroup.findOne({ slug: badgeGroup });

    if (!group) {
      return errorMessage(next, "This badge group does not exist.");
    }

    const category = await BadgeCategory.findOne({ slug: badgeCategory });

    if (!category) {
      return errorMessage(next, "This badge category does not exist.");
    } else if (String(category.badge_group) !== String(group._id)) {
      return errorMessage(
        next,
        "This badge category does not belong to this group."
      );
    }

    const badges = await Badge.find({
      badge_category: category._id,
    }).sort({ title: "asc" });

    res.status(200).json({
      status: "success",
      badgeGroup: group.title,
      badgeCategory: category.title,
      thumbnail: category.thumbnail,
      data: badges,
    });
  } catch (error) {
    return errorMessage(next, error.message);
  }
};

exports.createBadge = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || !user.is_admin) {
      return errorMessage(next, "Permission denied.");
    }

    const {
      title,
      description,
      wikipedia_url,
      badge_category,
      location,
    } = req.body;

    if (!title || !description || !wikipedia_url || !badge_category) {
      return errorMessage(next, "Not all fields have been entered.");
    }

    const newBadge = new Badge({
      title,
      description,
      wikipedia_url,
      badge_category,
      location,
    });
    const savedBadge = await newBadge.save();

    res.status(201).json({
      status: "success",
      data: savedBadge,
    });
  } catch (error) {
    return errorMessage(next, error.message);
  }
};

exports.getAllBadges = async (req, res, next) => {
  try {
    const badges = await Badge.find().sort({ title: "asc" });

    res.status(201).json({
      status: "success",
      data: badges,
    });
  } catch (error) {
    return errorMessage(next, error.message);
  }
};
