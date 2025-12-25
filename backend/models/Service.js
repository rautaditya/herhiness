const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    category: {
      type: String,
      enum: ["Stitching", "Handworking", "Saree", "Altering"],
      required: true,
    },

    measurements: [
      {
        name: String,
        required: { type: Boolean, default: true },
      },
    ],

    basePrice: { type: Number, required: true },

    estimatedDays: Number,

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
