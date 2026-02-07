import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className={`navbar navbar-expand-lg ${theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-primary text-white"}`}>
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">
          Subscription Dashboard
        </Link>

        <div>
          <Link className="btn btn-light me-2" to="/plans">Plans</Link>
          <Link className="btn btn-light me-2" to="/dashboard">Dashboard</Link>
          <Link className="btn btn-warning me-2" to="/admin/subscriptions">Admin</Link>

          {/* Dark / Light Toggle */}
          <button
            className={`btn ${theme === "dark" ? "btn-light" : "btn-dark"} me-2`}
            onClick={toggleTheme}
          >
            {theme === "dark" ? "Light Mode ☀️" : "Dark Mode 🌙"}
          </button>

          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
