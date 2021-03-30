const User = require("../models/userModel");

exports.getUser = async (req, res) => {
  const user = await User.findById(req.userId);

  res.status(200).json({
    user,
  });
};
