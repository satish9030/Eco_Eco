import { useNavigate } from "react-router-dom";
import "./GovLogin.css";

function GovLogin() {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const govId = e.target[0].value;
    const password = e.target[1].value;

    const res = await fetch("https://eco-eco-xxxx.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: "gov",          // 🔴 DIFFERENCE FROM PEOPLE
        username: govId,
        password
      })
    });

    if (res.ok) {
      const data = await res.json();                 // ✅ READ TOKEN
      localStorage.setItem("gov_token", data.token); // ✅ SAVE GOV TOKEN
      navigate("/gov/dashboard", { replace: true });
    } else {
      alert("Invalid government credentials");
    }
  };

  return (
    <div className="gov-login-bg">
      <div className="gov-login-card">
        <h1>Government Login</h1>

        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Government ID" required />
          <input type="password" placeholder="Password" required />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default GovLogin;
