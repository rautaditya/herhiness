const Staff = require("../models/Staff");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await Staff.findOne({ name, isActive: true }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        permissions: user.permissions,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

// GET LOGGED-IN USER
exports.me = async (req, res) => {
  res.json(req.user);
};

exports.registerStaff = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      address,
      gender,
      role,
      salary,
      aadharNo,
      experience,
      certified,
      profileImage,
      password,
    } = req.body;

    // Check existing staff
    const staffExists = await Staff.findOne({
      $or: [{ email }, { mobile }, { aadharNo }],
    });

    if (staffExists) {
      return res.status(400).json({
        message: "Staff with same email/mobile/aadhar already exists",
      });
    }

    // Create staff (password will be hashed automatically)
    const staff = await Staff.create({
      name,
      email,
      mobile,
      address,
      gender,
      role,
      salary,
      aadharNo,
      experience,
      certified,
      profileImage,
      password,
    });

    res.status(201).json({
      message: "Staff registered successfully",
      staff: {
        id: staff._id,
        name: staff.name,
        email: staff.email,
        mobile: staff.mobile,
        role: staff.role,
        permissions: staff.permissions,
        isActive: staff.isActive,
        dateOfJoining: staff.dateOfJoining,
      },
    });
  } catch (error) {
    console.error(error);

    // Handle mongoose unique errors
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate field value already exists",
      });
    }

    res.status(500).json({ message: error.message });
  }
};
