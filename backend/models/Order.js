const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderNo: { type: String, required: true, unique: true, index: true },

    parentOrder: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
    },

    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },

    category: { type: String, required: true },

    measurements: [{ fieldName: String, value: String }],

    designImage: String,

    color: String,

    rawMaterial: {
      cloth: { type: Boolean, default: false },
      lining: { type: Boolean, default: false },
    },

    priority: { type: String, enum: ["Normal", "Urgent"], default: "Normal" },

    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],

    expectedDate: { type: Date, required: true },

    actualDeliveryDate: Date,

    payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },

    status: {
      type: String,
      enum: [
        "Placed",
        "Cutting",
        "Handworking",
        "Tailoring",
        "Quality Check",
        "Ready to Deliver",
        "Delivered",
      ],
      default: "Placed",
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
