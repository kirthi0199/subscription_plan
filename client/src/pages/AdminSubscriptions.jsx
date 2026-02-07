import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { ThemeContext } from "../ThemeContext";

export default function AdminSubscriptions() {
  const [subs, setSubs] = useState([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    api.get("/admin/subscriptions").then(res => setSubs(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Admin — All Subscriptions</h2>

      <div className="row">
        {subs.map(s => (
          <div className="col-md-4 mb-3" key={s._id}>
            <div className={`card p-3 ${theme === "dark" ? "bg-dark text-white" : ""}`}>
              <h5>User: {s.user_id.email}</h5>
              <p>Plan: {s.plan_id.name}</p>
              <p>Status: <b>{s.status}</b></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
