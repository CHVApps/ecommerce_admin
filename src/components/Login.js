import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("⚠️ Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch("https://ecommerce-backend-lv9n.onrender.com/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username: username.trim().toLowerCase(), // 🔥 Convert username to lowercase & trim spaces
          password: password.trim()
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        localStorage.setItem("adminLoggedIn", "true");
        navigate("/admin-panel"); // Redirect to AdminPanel after successful login
      } else {
        alert("❌ Invalid credentials. Please try again.");
      }
    } catch (error) {
      alert("🚨 Server error. Please try again.");
    }
};

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
