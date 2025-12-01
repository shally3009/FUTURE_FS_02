// server/middleware/auth.js
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

function auth(req, res, next) {
  const authHeader = req.headers.authorization; // "Bearer token"
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { userId, role, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// optional: admin-only middleware
function admin(req, res, next) {
  if (!req.user || req.user.role !== "admin")
    return res.status(403).json({ message: "Admin only" });
  next();
}

module.exports = { auth, admin };
