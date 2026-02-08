import express from "express";
import Subscription from "../models/Subscription.js";
import Plan from "../models/Plan.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= USER ROUTE ================= */
router.get("/my-subscription", auth, async (req, res) => {
  try {
    const subs = await Subscription.find({
      user_id: req.user.id
    })
      .populate("plan_id")
      .sort({ start_date: -1 }); // newest first

    if (!subs || subs.length === 0) {
      return res.status(404).json({ message: "No subscriptions found" });
    }

    res.json(subs);   // <-- now returns ARRAY, not single object

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/* ================= ADMIN ROUTE (FIXED) ================= */
router.get("/admin/subscriptions", auth, async (req, res) => {

  // ✅ Manually check admin role instead of adminOnly middleware
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }

  const subs = await Subscription.find()
    .populate("user_id", "name email role")
    .populate("plan_id", "name price duration");

  res.json(subs);
});
router.post("/subscribe/:planId", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { planId } = req.params;

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + plan.duration);

    const sub = await Subscription.create({
      user_id: userId,
      plan_id: planId,
      start_date: startDate,
      end_date: endDate,
      status: "active",
    });

    res.json({ message: "Subscribed", sub });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
