const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },

    totalAmount: { type: Number, required: true },

    advanceAmount: { type: Number, default: 0 },

    balanceAmount: { type: Number },

    extraCharges: {
      amount: { type: Number, default: 0 },
      note: String,
    },

    paymentMode: {
      type: String,
      enum: ["Cash", "UPI", "Card", "Bank Transfer"],
    },

    transactionId: String,

    status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
  },
  { timestamps: true }
);

// auto balance
paymentSchema.pre("save", function (next) {
  this.balanceAmount =
    this.totalAmount + (this.extraCharges?.amount || 0) - this.advanceAmount;
  next();
});

module.exports = mongoose.model("Payment", paymentSchema);
