const Staff = require("../models/Staff");

const createStaff = async (req, res) => {
  try {
    const staff = await Staff.create(req.body);

    res.status(201).json({
      success: true,
      message: "Staff added successfully",
      data: staff,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding staff",
      error: error.message,
    });
  }
};
/* GET all staff */
const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find().select("-password");
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET single staff by ID */
const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id).select("-password");

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE staff */
const updateStaff = async (req, res) => {
  try {
    const updatedStaff = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json({
      message: "Staff updated successfully",
      data: updatedStaff,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* DELETE staff */
const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { createStaff, getAllStaff, getStaffById, updateStaff, deleteStaff };
