import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { useSelector } from "react-redux";
import { ThemeContext } from "../ThemeContext";
 import { Link } from "react-router-dom";
export default function Dashboard() {
  const { theme } = useContext(ThemeContext);
  const user = useSelector(state => state.auth.user);

  const [mySub, setMySub] = useState(null);
  const [allSubs, setAllSubs] = useState([]);

const [mySubs, setMySubs] = useState([]); // <-- change state name
useEffect(() => {
  if (!user) return;

  if (user.role === "user") {
    api.get("/my-subscription")
      .then(res =>
        setMySubs(Array.isArray(res.data) ? res.data : [res.data])
      )
      .catch(() => setMySubs([]));
  } 
  else if (user.role === "admin") {
    api.get("/admin/subscriptions")
      .then(res => setAllSubs(res.data || []));
  }
}, [user]);


if (!user) {
  return <h3 className="text-center mt-5">Loading...</h3>;
}

  return (
    <div className="container mt-4">
   


<h2 className="mb-3">
  {user?.role === "admin" ? "Admin Dashboard" : "My Dashboard"}
</h2>

<Link className="btn btn-success mb-3" to="/plans">
  View Plans / Subscribe
</Link>


      {/* ================= USER VIEW ================= */}
     {user?.role === "user" && (
  <div className="row">
    {mySubs.length === 0 ? (
      <h4 className="text-center">No subscriptions yet</h4>
    ) : (
      mySubs.map(s => (
        <div className="col-md-4 mb-3" key={s._id}>
          <div className={`card p-3 ${theme === "dark" ? "bg-dark text-white" : ""}`}>
            <h5>Plan: {s.plan_id.name}</h5>
            <p><b>Status:</b> {s.status}</p>
            <p>
              <b>From:</b> {new Date(s.start_date).toDateString()} <br />
              <b>To:</b> {new Date(s.end_date).toDateString()}
            </p>
          </div>
        </div>
      ))
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
