const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    mobile: {
      type: String,
      required: true,
      match: /^[6-9]\d{9}$/,
    },

    address: String,

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    role: {
      type: String,
      enum: ["Admin", "Manager", "Cutter", "Tailor", "Handworker"],
      required: true,
      index: true,
    },

    permissions: {
      type: [String],
      default: [],
    },

    salary: {
      type: Number,
      default: 0,
    },

    aadharNo: {
      type: String,
      unique: true,
      sparse: true,
      match: /^[0-9]{12}$/,
    },

    experience: {
      type: Number,
      default: 0,
    },

    certified: {
      type: Boolean,
      default: false,
    },

    profileImage: String,

    password: {
      type: String,
      required: true,
      select: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    dateOfJoining: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

/* Permissions + Password Hash (single hook) */
staffSchema.pre("save", async function () {
  // Role based permissions
  if (this.isNew) {
    if (this.role === "Admin") {
      this.permissions = ["all"];
    } else if (this.role === "Manager") {
      this.permissions = ["assign_task", "manage_orders", "view_reports"];
    } else {
      this.permissions = ["view_tasks", "update_task_status"];
    }
  }

  // Hash password only once
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

module.exports = mongoose.model("Staff", staffSchema);
