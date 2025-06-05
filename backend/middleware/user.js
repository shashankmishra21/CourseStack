const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require('../config');

function userMiddleware(req, res, next) {
  // Try to get token from custom header `token`
  let token = req.headers.token;

  // If no token there, try from Authorization header "Bearer <token>"
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) {
    return res.status(403).json({ message: "Token must be provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_USER_PASSWORD);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}

module.exports = {
    userMiddleware: userMiddleware
}