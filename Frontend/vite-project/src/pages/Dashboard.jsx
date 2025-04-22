import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      navigate("/login");
    } else {
      setUser(storedUser);
      fetchUsers(token);
    }
  }, [navigate]);

  const fetchUsers = async (token) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/auth/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card p-5 shadow-lg"
        style={{ maxWidth: "600px", width: "100%", borderRadius: "16px" }}
      >
        <h2 className="text-center mb-4">🎉 Welcome to Your Dashboard</h2>

        {user && (
          <div className="text-center mb-4">
            <p>
              👋 <strong>{user.name}</strong>
            </p>
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>
              {user.email}
            </p>
          </div>
        )}

        <button
          className="btn btn-outline-danger w-100 mb-4"
          onClick={handleLogout}
        >
          🔓 Logout
        </button>

        <h5 className="mb-3">📋 All Registered Users</h5>
        <ul className="list-group list-group-flush">
          {users.map((u) => (
            <li
              key={u._id}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
                marginBottom: "8px",
              }}
            >
              <div>
                <strong>{u.name}</strong>
                <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                  {u.email}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
