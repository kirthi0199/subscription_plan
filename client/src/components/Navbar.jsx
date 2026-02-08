import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

export default function Navbar() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className={`navbar navbar-expand-lg ${theme === "dark" ? "bg-dark navbar-dark" : "bg-light navbar-light"}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">Subscription App</Link>

        <div className="ms-auto d-flex align-items-center gap-3">

          {/* Dark / Light toggle ALWAYS visible */}
          <button onClick={toggleTheme} className="btn btn-outline-primary">
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>

          {/* Show these links ONLY after login */}
          {user && (
            <>
              <Link className="btn btn-primary" to="/dashboard">
                Dashboard
              </Link>

              <Link className="btn btn-success" to="/plans">
                Plans
              </Link>
            </>
          )}

          {/* Login / Logout buttons */}
          {!user ? (
            <>
              <Link className="btn btn-outline-secondary" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline-secondary" to="/register">
                Register
              </Link>
            </>
          ) : (
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}
