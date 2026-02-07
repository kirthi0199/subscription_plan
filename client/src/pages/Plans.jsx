import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    api.get("/plans").then(res => setPlans(res.data));
  }, []);

  const subscribe = async (id) => {
    await api.post(`/subscribe/${id}`);
    alert("Subscribed!");
  };

  return (
    <div className="row">
      {plans.map(p => (
        <div className="col-md-4 mb-3" key={p._id}>
          <div className="card p-3">
            <h5>{p.name}</h5>
            <p>₹ {p.price}</p>
            <button className="btn btn-success" onClick={() => subscribe(p._id)}>
              Subscribe
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
