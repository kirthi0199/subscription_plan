import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/plans").then(res => setPlans(res.data));
  }, []);

 const handleSubscribe = async (planId) => {
  try {
    console.log("Subscribing to plan:", planId);

    const res = await api.post(`/subscribe/${planId}`);
    console.log("Backend response:", res.data);

    alert("Subscribed successfully!");
    navigate("/dashboard");
  } catch (err) {
    console.error("Subscribe error:", err.response);
    alert(err.response?.data?.message || "Subscription failed");
  }
};


  return (
    <div className="row mt-4">
      {plans.map(p => (
        <div className="col-md-4 mb-3" key={p._id}>
          <div className="card p-3">
            <h5>{p.name}</h5>
            <p>₹ {p.price}</p>
            <p>Duration: {p.duration} days</p>

            <button
              className="btn btn-success"
              onClick={() => handleSubscribe(p._id)}
            >
              Subscribe
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
