import { useContext } from "react";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required")
    }),
    onSubmit: async (values) => {
      try {
        const res = await api.post("/auth/login", values);

        dispatch(
          setAuth({
            token: res.data.token,
            user: res.data.user
          })
        );

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate("/dashboard");
      } catch (err) {
        alert("Invalid credentials");
      }
    }
  });

  return (
    <div className="login-page">
      <div
        className={`card p-4 shadow login-card ${
          theme === "dark" ? "bg-dark text-white" : ""
        }`}
        style={{ width: "400px" }}
      >
        <h3 className="text-center mb-3">Login</h3>

        <form onSubmit={formik.handleSubmit}>
          <input
            className="form-control mb-2"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-danger mb-2">
              {formik.errors.email}
            </div>
          )}

          <input
            className="form-control mb-3"
            type="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-danger mb-2">
              {formik.errors.password}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100 mb-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
