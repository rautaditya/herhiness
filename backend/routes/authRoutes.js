const express = require("express");
const router = express.Router();

const { login, me } = require("../controlllers/authController");
const { protect } = require("../middlewares/autthMiddleware");

router.post("/login", login);
router.get("/me", protect, me);

module.exports = router;
