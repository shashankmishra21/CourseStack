const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");

function adminMiddleware(req, res, next) {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Admin auth failed" });
  }
}

module.exports = { adminMiddleware };