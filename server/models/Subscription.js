import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  plan_id: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
  start_date: Date,
  end_date: Date,
  status: String
});

export default mongoose.model("Subscription", SubscriptionSchema);
