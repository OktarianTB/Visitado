const express = require("express");
const { getUser, followUser } = require("../controllers/userController");
const {
  addLocationToUser,
  getLocationsForUser,
} = require("../controllers/locationController");
const auth = require("../controllers/authMiddleware");

const router = express.Router();

router.get("/location/:userId", getLocationsForUser);
router.post("/location", auth, addLocationToUser);
router.get("/follow/:followUserId", auth, followUser);
router.get("/:userId", getUser);

module.exports = router;
