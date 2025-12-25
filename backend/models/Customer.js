const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    phone: {
      type: String,
      required: true,
      unique: true,
      index: true,
      match: /^[6-9]\d{9}$/,
    },

    email: { type: String, unique: true, sparse: true, lowercase: true },

    address: String,

    gender: { type: String, enum: ["Male", "Female", "Other"] },

    notes: String,

    isMeasurementSaved: { type: Boolean, default: false },

    preferredTailor: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },

    lastOrderDate: Date,

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
