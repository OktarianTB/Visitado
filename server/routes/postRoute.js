const express = require("express");
const {
  getPostsForUser,
  createPost,
  getPostFeed,
} = require("../controllers/postController");
const { getBadgePosts } = require("../controllers/badgeController");
const auth = require("../controllers/authMiddleware");

const router = express.Router();

router.get("/all", getPostFeed);
router.get("/badges/:username", getBadgePosts);
router.get("/recent/:username", getPostsForUser);
router.post("/", auth, createPost);

module.exports = router;
