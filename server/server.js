import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import { seedPlans } from "./seed/seedPlans.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB().then(seedPlans);

app.use("/api/auth", authRoutes);

app.use("/api", planRoutes);
app.use("/api", subscriptionRoutes);

app.listen(process.env.PORT, () =>
  console.log("Server running on 5000")
);
