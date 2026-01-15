import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [factoryId, setFactoryId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://eco-eco-xxxx.onrender.com/factory/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          factory_id: factoryId,
          password
        })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("factoryId", data.factory_id);
        navigate("/factory/dashboard");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch {
      alert("Backend not reachable");
    }
  };

  return (
    <div className="page-bg">
      <div className="factory-login-card">
        <h2>Factory Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Factory ID (ex: F001)"
            required
            onChange={(e) => setFactoryId(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        <button className="back" onClick={() => navigate("/")}>
          ← Back
        </button>
      </div>
    </div>
  );
}

export default Login;
