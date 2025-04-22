import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError("");

    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/login`, formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/restaurant");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{ width: "100%", maxWidth: "420px", borderRadius: "16px" }}
      >
        <h3 className="text-center mb-4">🔐 Login to Your Account</h3>

        {error && (
          <div className="alert alert-danger text-center" style={{ fontSize: "0.95rem" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">📧 Email address</label>
            <input
              type="email"
              name="email"
              className="form-control form-control-lg"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">🔑 Password</label>
            <input
              type="password"
              name="password"
              className="form-control form-control-lg"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-100">
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="d-block text-decoration-none mb-2">
            Forgot Password?
          </Link>
          <span className="text-muted" style={{ fontSize: "0.9rem" }}>
            Don’t have an account?{" "}
            <Link to="/register" className="text-decoration-none">
              Register here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
