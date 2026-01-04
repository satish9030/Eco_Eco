import { useNavigate } from "react-router-dom";
import "./peoplehome.css";

function PeopleHome() {
  const navigate = useNavigate();

  return (
    <div className="people-home-bg">
      <div className="people-home-card">
        <h1>Public Access</h1>
        <p>
          Login or register to view factory pollution data and raise official
          complaints.
        </p>

        <button
          className="login-btn"
          onClick={() => navigate("/people/login")}
        >
          Public Login
        </button>

        <button
          className="register-btn"
          onClick={() => navigate("/people/register")}
        >
          Public Register
        </button>
      </div>
    </div>
  );
}

export default PeopleHome;
