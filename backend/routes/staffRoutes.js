// const express = require("express");
// const router = express.Router();

// const { createStaff } = require("../controllers/staffController");
// const { protect } = require("../middlewares/authMiddleware");

// router.post("/add", protect, createStaff);

// module.exports = router;

import express from "express";
import { createStaff,getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff } from "../controllers/staffController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, createStaff);
router.get("/", protect, getAllStaff);
router.get("/:id", protect, getStaffById);
router.put("/:id", protect, updateStaff);
router.delete("/:id", protect, deleteStaff);

export default router;
