const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.status(200).json({
    message: "Hello world!",
  });
});

module.exports = router;
