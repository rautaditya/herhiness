const express = require("express");
const router = express.Router();

const { login, me, registerStaff } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/login", login);
router.get("/me", protect, me);
router.post("/register", protect, registerStaff);

module.exports = router;
