import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", form);
      alert("Registered successfully! Now login.");
      navigate("/login");
    } catch (err) {
      alert("Email already exists or error occurred");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold mb-4">Register</h1>

      <input
        className="border p-2 block mb-2"
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="border p-2 block mb-2"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        className="border p-2 block mb-2"
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2"
        onClick={handleRegister}
      >
        Register
      </button>
    </div>
  );
}
