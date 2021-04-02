const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  validate,
} = require("../controllers/authController");
const { getFullUser } = require("../controllers/userController");
const auth = require("../controllers/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/validate", validate);

router.get("/user", auth, getFullUser);

module.exports = router;
