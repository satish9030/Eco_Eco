import { useNavigate } from "react-router-dom";
import "./peoplelogin.css";

function PeopleLogin() {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    const res = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: "public",
        username: email,
        password
      })
    });

    if (res.ok) {
      const data = await res.json();     // ✅ READ RESPONSE
      localStorage.setItem("token", data.token); // ✅ SAVE TOKEN
      navigate("/people/dashboard", { replace: true });
    } else {
      alert("Invalid public credentials");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2>Public Login</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default PeopleLogin;
