import Plan from "../models/Plan.js";

const seedPlans = async () => {
  try {
    const count = await Plan.countDocuments();

    if (count > 0) {
      console.log("✅ Plans already exist — skipping seed.");
      return;
    }

    const plans = [
      {
        name: "Basic",
        price: 199,
        duration: 30
      },
      {
        name: "Standard",
        price: 499,
        duration: 90
      },
      {
        name: "Premium",
        price: 999,
        duration: 180
      }
    ];

    await Plan.insertMany(plans);
    console.log("🌱 Plans seeded successfully!");
  } catch (err) {
    console.error("❌ Seeding error:", err);
  }
};

export default seedPlans;
