import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { ThemeContext } from "../ThemeContext";

export default function Dashboard() {
  const [sub, setSub] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    api.get("/my-subscription").then(res => setSub(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">My Dashboard</h2>

      <div className={`card p-4 ${theme === "dark" ? "bg-dark text-white" : ""}`}>
        {sub ? (
          <>
            <h4>Active Plan: {sub.plan_id.name}</h4>
            <p>Status: <b>{sub.status}</b></p>
            <p>Start: {new Date(sub.start_date).toDateString()}</p>
            <p>End: {new Date(sub.end_date).toDateString()}</p>
          </>
        ) : (
          <h5>No active subscription</h5>
        )}
      </div>
    </div>
  );
}
