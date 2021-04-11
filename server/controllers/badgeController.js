const BadgeGroup = require("../models/badgeGroupModel");
const BadgeCategory = require("../models/badgeCategoryModel");
const Badge = require("../models/badgeModel");
const User = require("../models/userModel");
const ObtainedBadge = require("../models/obtainedBadgeModel");
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

    const badgesObtainedByUser = await ObtainedBadge.find({
      user: req.userId,
    }).select("badge -_id");

    const userBadges = badges.map((badge) => {
      const userBadge = {
        _id: badge._id,
        title: badge.title,
        wikipedia_url: badge.wikipedia_url,
        description: badge.description,
        completed: false,
      };

      badgesObtainedByUser.forEach((obtained) => {
        if (String(obtained.badge) === String(badge._id)) {
          userBadge.completed = true;
        }
      });

      return userBadge;
    });

    res.status(200).json({
      status: "success",
      badgeGroup: group.title,
      badgeCategory: category.title,
      thumbnail: category.thumbnail,
      data: userBadges,
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

exports.addBadgeToUser = async (req, res, next) => {
  try {
    const { badge } = req.body;

    if (!badge) {
      return errorMessage(next, "Not all fields have been entered.");
    }

    const newObtainedBadge = new ObtainedBadge({
      badge,
      user: req.userId,
    });
    const savedObtainedBadge = await newObtainedBadge.save();

    res.status(201).json({
      status: "success",
      data: savedObtainedBadge,
    });
  } catch (error) {
    return errorMessage(next, error.message);
  }
};

exports.removeBadgeFromUser = async (req, res, next) => {
  try {
    const { badgeId } = req.params;

    if (!badgeId.match(/^[0-9a-fA-F]{24}$/)) {
      return errorMessage(next, "This badge does not exist.");
    }

    const obtainedBadge = await ObtainedBadge.findOne({
      badge: badgeId,
      user: req.userId,
    });

    if (!obtainedBadge) {
      return errorMessage(next, "User hasn't obtained this badge.");
    }

    await ObtainedBadge.findByIdAndDelete(obtainedBadge._id);

    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    return errorMessage(next, error.message);
  }
};

function sort_object(dict) {
  // Create items array
  let items = Object.keys(dict).map(function (key) {
    return [key, dict[key]];
  });

  // Sort the array based on the second element
  items.sort(function (first, second) {
    return second[1] - first[1];
  });

  items = items.slice(0, 5);
  return items.map((item) => item[0]);
}

exports.getBadgesForProfile = async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) {
      return errorMessage(next, "This user does not exist.");
    }

    const badges = await ObtainedBadge.find({ user: user._id }).populate(
      "badge"
    );

    const categories = badges.map((badge) => badge.badge.badge_category);
    const unique_categories = [...new Set(categories.map((item) => item))];

    res.status(201).json({
      status: "success",
      data: unique_categories,
    });
  } catch (error) {
    return errorMessage(next, error.message);
  }
};

exports.getBadgePosts = async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) {
      return errorMessage(next, "This user does not exist.");
    }

    const badges = await ObtainedBadge.find({ user: user._id })
      .sort("-createdAt")
      .populate({
        path: "badge",
        select: "title badge_category",
      })
      .limit(5);

    res.status(201).json({
      status: "success",
      data: badges,
    });
  } catch (error) {
    return errorMessage(next, error.message);
  }
};
