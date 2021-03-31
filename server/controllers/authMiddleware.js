const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const errorMessage = (next) => {
  next(createError(401, "Authorization denied, user is not logged in."));
};

const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    
    if (!token) {
      return errorMessage(next);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      return errorMessage(next);
    }

    req.userId = verified.id;
    next();
  } catch {
    return errorMessage(next);
  }
};

module.exports = auth;
