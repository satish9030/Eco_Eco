import "./Dashboard.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const navigate = useNavigate();
  const factoryId = localStorage.getItem("factoryId");

  const [factory, setFactory] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/factory/dashboard/${factoryId}`)
      .then(res => res.json())
      .then(data => setFactory(data));
  }, [factoryId]);

  if (!factory) return null;

  const emissionValues = Object.values(factory.emissions);
  const months = Object.keys(factory.emissions);

  const latestEmission = factory.latest_emission;
  const allowedLimit = factory.allowed_limit;
  const status = factory.status;
  const fine = latestEmission > allowedLimit ? 500 : 0;

  const airData = {
    labels: months,
    datasets: [
      {
        label: "Air Emission",
        data: emissionValues,
        borderColor: "#4caf50",
        backgroundColor: "#4caf50",
        tension: 0.4
      }
    ]
  };

  const waterData = {
    labels: months,
    datasets: [
      {
        label: "Water Emission",
        data: emissionValues.map(v => Math.round(v * 0.75)),
        borderColor: "#2196f3",
        backgroundColor: "#2196f3",
        tension: 0.4
      }
    ]
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-content">
        <h1>Today's Emission Status</h1>

        {/* TOP CARDS */}
        <div className="cards">
          <div className="card blue">
            <p>Air Emission</p>
            <h2>{latestEmission} / {allowedLimit}</h2>
          </div>

          <div className="card cyan">
            <p>Water Emission</p>
            <h2>{Math.round(latestEmission * 0.75)} / {Math.round(allowedLimit * 0.75)}</h2>
          </div>

          <div className="card green">
            <p>Status</p>
            <h2>{status}</h2>
          </div>

          <div className="card pink">
            <p>Today Fine</p>
            <h2>₹{fine}</h2>
          </div>
        </div>

        {/* GRID SECTION */}
        <div className="grid">
          <div className="box">
            <h3>Air Emission Trends</h3>
            <Line data={airData} />
          </div>

          <div className="box center">
            <h3>Compliance Status</h3>
            <div className="gauge">
              <div className="circle">
                {Math.round((latestEmission / allowedLimit) * 100)}%
              </div>
              <p>
                {status === "SAFE"
                  ? "Air and water emissions are within safe limits."
                  : "Emission limit exceeded. Action required."}
              </p>
            </div>
          </div>

          <div className="box">
            <h3>Recent Submissions</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date / Time</th>
                  <th>Air</th>
                  <th>Fine</th>
                </tr>
              </thead>
              <tbody>
                {months.slice(-3).reverse().map((m, i) => (
                  <tr key={i}>
                    <td>{factoryId}</td>
                    <td>{m}</td>
                    <td>{factory.emissions[m]}</td>
                    <td>
                      {factory.emissions[m] > allowedLimit ? "₹500" : "₹0"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="view">View All →</div>
          </div>

          <div className="box full-width">
            <h3>Water Emission Trends</h3>
            <Line data={waterData} />
          </div>
        </div>

        <div className="bottom-submit-container">
          <button
            className="bottom-submit-btn"
            onClick={() => navigate("/factory/submit")}
          >
            + Submit Emission
          </button>
        </div>
      </div>
    </div>
  );
}
