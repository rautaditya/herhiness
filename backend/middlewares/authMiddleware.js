const jwt = require("jsonwebtoken");
const Staff = require("../models/Staff");

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Staff.findById(decoded.id).select("-password");
    if (!user || !user.isActive) {
      return res.status(401).json({ message: "User not active" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
exports.adminOrManager = (req, res, next) => {
  const role = req.user.role;

  if (role !== "admin" && role !== "manager") {
    return res.status(403).json({
      message: "Access denied. Admin or Manager only.",
    });
  }

  next();
};