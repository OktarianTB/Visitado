const express = require("express");
const {
  getPostsForUser,
  createPost,
} = require("../controllers/postController");
const auth = require("../controllers/authMiddleware");

const router = express.Router();

router.get("/:userId", getPostsForUser);
router.post("/", auth, createPost);

module.exports = router;
