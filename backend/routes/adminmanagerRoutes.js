const express = require("express");
const router = express.Router();


const {createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff} = require("../controllers/adminmanagerController");
const { protect } = require("../middlewares/authMiddleware");



router.post("/", protect,createStaff);
router.get("/",protect,getAllStaff);
router.get("/:id", protect,getStaffById);
router.put("/:id", protect,updateStaff);
router.delete("/:id", protect,deleteStaff);

module.exports = router;