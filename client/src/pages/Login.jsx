import { useState } from "react";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      dispatch(loginSuccess(res.data));

      alert("Login Successful");
      navigate("/plans");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold mb-4">Login</h1>

      <input
        className="border p-2 block mb-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 block mb-2"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 mr-2"
        onClick={handleLogin}
      >
        Login
      </button>

      {/* 👉 REGISTER BUTTON */}
      <button
        className="bg-green-600 text-white px-4 py-2"
        onClick={() => navigate("/register")}
      >
        Register
      </button>
    </div>
  );
}
