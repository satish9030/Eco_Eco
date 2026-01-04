import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="page-bg">
      <div className="factory-card">
        <h2>Factory Registration</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Factory Name" required />
          <input type="text" placeholder="Industry Type" required />
          <input type="text" placeholder="Location" required />

          <select required>
            <option value="">Product Type</option>
            <option>Essential Product</option>
            <option>Non-Essential Product</option>
          </select>

          <input
            type="number"
            placeholder="Production Capacity"
            required
          />

          <button type="submit">Register</button>
        </form>

        <button className="back" onClick={() => navigate("/")}>
          ← Back
        </button>
      </div>
    </div>
  );
}

export default Register;
