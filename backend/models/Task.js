const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },

    stage: {
      type: String,
      enum: ["Cutting", "Handworking", "Tailoring", "Quality Check"],
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
      index: true,
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },

    deadline: Date,

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Done", "Reassigned"],
      default: "Pending",
      index: true,
    },

    remarks: String,

    startedAt: Date,
    completedAt: Date,

    isReassigned: {
      type: Boolean,
      default: false,
    },

    history: [
      {
        action: String,
        from: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
        to: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
        note: String,
        at: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

/* Task → Order status sync */
const stageToOrderStatus = {
  Cutting: "Cutting",
  Handworking: "Handworking",
  Tailoring: "Tailoring",
  "Quality Check": "Quality Check",
};

taskSchema.post("save", async function (doc) {
  try {
    const Order = mongoose.model("Order");
    const order = await Order.findById(doc.order);
    if (!order) return;

    const newStatus = stageToOrderStatus[doc.stage];
    if (newStatus && order.status !== newStatus) {
      order.status = newStatus;
      await order.save();
    }
  } catch (err) {
    console.error("Task sync error:", err.message);
  }
});

module.exports = mongoose.model("Task", taskSchema);
