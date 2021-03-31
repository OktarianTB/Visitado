const express = require("express");
const {
  getBadgeGroups,
  getBadgeCategories,
  getBadges,
  createBadgeGroup,
  createBadgeCategory,
  createBadge,
} = require("../controllers/badgeController");
const auth = require("../controllers/authMiddleware");

const router = express.Router();

router.get("/group", getBadgeGroups);
router.get("/category/:badgeGroup", getBadgeCategories);
router.get("/items/:badgeGroup/:badgeCategory", getBadges);

router.post("/group", auth, createBadgeGroup);
router.post("/category", auth, createBadgeCategory);
router.post("/items", auth, createBadge);

module.exports = router;
