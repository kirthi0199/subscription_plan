import { useState, useContext } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", form);
      alert("Registered successfully! Now login.");
      navigate("/login");
    } catch {
      alert("Email already exists or error occurred");
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className={`card p-4 shadow ${theme === "dark" ? "bg-dark text-white" : ""}`} style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Register</h3>

        <input
          className="form-control mb-2"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="form-control mb-2"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="btn btn-primary w-100" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}
