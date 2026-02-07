import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { useSelector } from "react-redux";
import { ThemeContext } from "../ThemeContext";

export default function Dashboard() {
  const { theme } = useContext(ThemeContext);
  const user = useSelector(state => state.auth.user);

  const [mySub, setMySub] = useState(null);
  const [allSubs, setAllSubs] = useState([]);

  useEffect(() => {
    if (!user) return;

    if (user.role === "user") {
      api.get("/my-subscription").then(res => setMySub(res.data));
    } 
    else if (user.role === "admin") {
      api.get("/admin/subscriptions").then(res => setAllSubs(res.data));
    }
  }, [user]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">
        {user?.role === "admin" ? "Admin Dashboard" : "My Dashboard"}
      </h2>

      {/* ================= USER VIEW ================= */}
      {user?.role === "user" && (
        <div className={`card p-4 ${theme === "dark" ? "bg-dark text-white" : ""}`}>
          {mySub ? (
            <>
              <h4>Plan: {mySub.plan_id.name}</h4>
              <p><b>Status:</b> {mySub.status}</p>
              <p><b>Start:</b> {new Date(mySub.start_date).toDateString()}</p>
              <p><b>End:</b> {new Date(mySub.end_date).toDateString()}</p>
            </>
          ) : (
            <h5>No active subscription</h5>
          )}
        </div>
      )}

      {/* ================= ADMIN VIEW ================= */}
      {user?.role === "admin" && (
        <div className="row">
          {allSubs.map(s => (
            <div className="col-md-4 mb-3" key={s._id}>
              <div className={`card p-3 ${theme === "dark" ? "bg-dark text-white" : ""}`}>
                <h5 className="mb-2">👤 User Details</h5>
                <p><b>Name:</b> {s.user_id.name}</p>
                <p><b>Email:</b> {s.user_id.email}</p>

                <hr />

                <h5 className="mb-2">📦 Plan Details</h5>
                <p><b>Plan:</b> {s.plan_id.name}</p>
                <p><b>Price:</b> ₹ {s.plan_id.price}</p>
                <p><b>Duration:</b> {s.plan_id.duration} days</p>

                <hr />

                <h5 className="mb-2">📅 Subscription</h5>
                <p><b>Status:</b> {s.status}</p>
                <p>
                  <b>From:</b> {new Date(s.start_date).toDateString()} <br />
                  <b>To:</b> {new Date(s.end_date).toDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
