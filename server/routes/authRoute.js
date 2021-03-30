const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  validate,
} = require("../controllers/authController");


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.post("/validate", validate);

module.exports = router;