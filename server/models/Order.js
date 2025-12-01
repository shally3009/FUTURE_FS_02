const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 👈 add this
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    address: { type: String, required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        title: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    totalPrice: Number,
    status: { type: String, default: "pending" }, // pending, shipped, delivered, etc.
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
