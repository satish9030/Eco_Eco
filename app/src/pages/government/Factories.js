import "./Factories.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Factories() {
  const navigate = useNavigate();
  const [factories, setFactories] = useState([]);

  useEffect(() => {
    fetch("https://eco-eco-xxxx.onrender.com/monthly-report")
      .then(res => res.json())
      .then(data => {
        const list = Object.entries(data.factories).map(([id, f]) => ({
          id,
          name: f.name,
          status: f.status
        }));
        setFactories(list);
      });
  }, []);

  return (
    <div className="factories-page">
      <h1>Registered Factories</h1>

      <div className="factory-table-box">
        <table className="factory-table">
          <thead>
            <tr>
              <th>Factory Name</th>
              <th>City</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {factories.map((f) => (
              <tr key={f.id}>
                <td>{f.name}</td>
                <td>Delhi</td>
                <td className={f.status === "EXCEEDED" ? "danger" : "safe"}>
                  {f.status}
                </td>
                <td>
                  <button
                    onClick={() =>
                      navigate("/gov/factory-details", {
                        state: { factoryId: f.id }
                      })
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
