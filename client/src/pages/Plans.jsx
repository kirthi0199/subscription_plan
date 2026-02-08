import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { ThemeContext } from "../ThemeContext";

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    api.get("/plans").then(res => setPlans(res.data));
  }, []);

  const handleSubscribe = async (planId) => {
    try {
      await api.post(`/subscribe/${planId}`);
      alert("Subscribed successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Subscription failed");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex flex-wrap justify-content-center gap-4">
        {plans.map((p, i) => (
          <Fade key={p._id} direction="up" duration={300}>
            <div className="plan-wrapper">
              <div
                className={`card p-4 plan-card position-relative ${
                  theme === "dark" ? "bg-dark text-white" : ""
                }`}
              >
              
                <h4 className="text-center">{p.name}</h4>
                <hr />

                <h3 className="text-center">₹ {p.price}</h3>
                <p className="text-center text-muted">
                  Valid for {p.duration} days
                </p>

                <ul>
                  <li>Unlimited Access</li>
                  <li>24/7 Support</li>
                  <li>Cancel Anytime</li>
                </ul>

                <button
                  className="btn btn-success w-100 mt-3"
                  onClick={() => handleSubscribe(p._id)}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
}
