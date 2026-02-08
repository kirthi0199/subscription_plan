import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";
import AdminSubscriptions from "./pages/AdminSubscriptions";
import Navbar from "./components/Navbar";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/plans"
          element={
            <PrivateRoute>
              <Plans />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminSubscriptions />
            </AdminRoute>
          }
        />

        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}
