import express from "express";
import Plan from "../models/Plan.js";

const router = express.Router();

router.get("/plans", async (req, res) => {
  const plans = await Plan.find();
  res.json(plans);
});


export default router;
