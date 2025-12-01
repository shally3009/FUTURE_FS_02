const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { auth, admin } = require("../middleware/auth");

// POST /api/orders  (user must be logged in)
router.post("/", auth, async (req, res) => {
  try {
    const { customerName, customerEmail, address, items, totalPrice } =
      req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = new Order({
      userId: req.user.userId,                 // 👈 link to logged-in user
      customerName,
      customerEmail,
      address,
      items,
      totalPrice,
    });

    const saved = await order.save();
    res.status(201).json({ message: "Order placed", order: saved });
  } catch (err) {
    console.error("Order create error:", err);
    res.status(500).json({ message: "Error creating order" });
  }
});

// GET /api/orders  (admin: all orders)
router.get("/", auth, admin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// 👇 NEW: GET /api/orders/my (logged-in user: only their orders)
router.get("/my", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (err) {
    console.error("My orders error:", err);
    res.status(500).json({ message: "Error fetching your orders" });
  }
});

module.exports = router;
