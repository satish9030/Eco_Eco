import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/factory/dashboard");
  };

  return (
    <div className="page-bg">
      <div className="factory-login-card">
        <h2>Factory Login</h2>

        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Factory ID / Email" required />
          <input type="password" placeholder="Password" required />
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
