const express = require("express");
const {
  getUser,
  followUser,
  updateUser,
} = require("../controllers/userController");
const {
  addLocationToUser,
  getLocationsForUser,
} = require("../controllers/locationController");
const auth = require("../controllers/authMiddleware");

const router = express.Router();

router.get("/location/:username", getLocationsForUser);
router.post("/location", auth, addLocationToUser);
router.get("/follow/:followUserId", auth, followUser); // make post
router.get("/:username", getUser);

router.post("/update", auth, updateUser);

module.exports = router;
