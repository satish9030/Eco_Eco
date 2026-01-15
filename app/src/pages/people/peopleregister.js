import { useNavigate } from "react-router-dom";
import "./peopleregister.css";

function PeopleRegister() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[1].value;
    const password = e.target[2].value;

    const res = await fetch("https://eco-eco-xxxx.onrender.com/public-register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (res.ok) {
      navigate("/people/login");
    } else {
      alert("User already exists");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2>Public Registration</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default PeopleRegister;
