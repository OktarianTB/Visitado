const express = require("express");
const {
  getBadgeGroups,
  getBadgeCategories,
  getBadges,
  getAllBadges,
  createBadgeGroup,
  createBadgeCategory,
  createBadge,
} = require("../controllers/badgeController");
const { getLocationsForBadges } = require("../controllers/locationController");
const auth = require("../controllers/authMiddleware");

const router = express.Router();

router.get("/group", getBadgeGroups);
router.get("/category/:badgeGroup", getBadgeCategories);
router.get("/items/:badgeGroup/:badgeCategory", getBadges);

router.get("/all", getAllBadges);
router.get("/locations", getLocationsForBadges);

router.post("/group", auth, createBadgeGroup);
router.post("/category", auth, createBadgeCategory);
router.post("/items", auth, createBadge);

module.exports = router;
