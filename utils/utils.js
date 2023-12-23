const jwt = require("jsonwebtoken");

const generateToken = (user, isRefreshToken) => {
  if (isRefreshToken) {
    return jwt.sign({ user }, process.env.TOKEN_SECRET_REFRESH, {
      expiresIn: "1min",
    });
  }
  return jwt.sign({ user }, process.env.TOKEN_SECRET, {
    expiresIn: "1min",
  });
};

module.exports = { generateToken };
