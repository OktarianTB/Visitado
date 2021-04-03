const express = require("express");
const { addLocation } = require("../controllers/locationController");
const auth = require("../controllers/authMiddleware");

const router = express.Router();

router.post("/", auth, addLocation);

module.exports = router;
