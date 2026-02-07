import express from "express";
import Subscription from "../models/Subscription.js";
import Plan from "../models/Plan.js";
import { auth, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/subscribe/:planId", auth, async (req, res) => {
  const plan = await Plan.findById(req.params.planId);

  const start = new Date();
  const end = new Date();
  end.setDate(start.getDate() + plan.duration);

  const sub = await Subscription.create({
    user_id: req.user.id,
    plan_id: plan._id,
    start_date: start,
    end_date: end,
    status: "active"
  });

  res.json(sub);
});

router.get("/my-subscription", auth, async (req, res) => {
  const sub = await Subscription.findOne({ user_id: req.user.id })
    .populate("plan_id");

  res.json(sub);
});

router.get("/admin/subscriptions", auth, adminOnly, async (req, res) => {
  const subs = await Subscription.find()
    .populate("user_id", "name email role")   // <-- IMPORTANT
    .populate("plan_id", "name price duration features"); // <-- IMPORTANT

  res.json(subs);
});



export default router;
