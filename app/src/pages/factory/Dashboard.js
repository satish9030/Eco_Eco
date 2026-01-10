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
import { useNavigate } from "react-router-dom";   // ✅ FIXED
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
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!factoryId) return;

    fetch(`http://127.0.0.1:5000/factory/dashboard/${factoryId}`)
      .then(res => res.json())
      .then(setData)
      .catch(() => console.error("Backend not reachable"));
  }, [factoryId]);

  if (!data) return null;

  const { today, charts, compliance, recent } = data;

  const airData = {
    labels: charts.months,
    datasets: [
      {
        label: "Air Emission",
        data: charts.air,
        borderColor: "#4caf50",
        backgroundColor: "#4caf50",
        tension: 0.4
      }
    ]
  };

  const waterData = {
    labels: charts.months,
    datasets: [
      {
        label: "Water Emission",
        data: charts.water,
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
            <h2>{today.air} / {today.air_limit}</h2>
          </div>

          <div className="card cyan">
            <p>Water Emission</p>
            <h2>{today.water} / {today.water_limit}</h2>
          </div>

          <div className="card green">
            <p>Status</p>
            <h2>{today.status}</h2>
          </div>

          <div className="card pink">
            <p>Today Fine</p>
            <h2>₹{today.fine}</h2>
          </div>
        </div>

        {/* GRID */}
        <div className="grid">
          <div className="box">
            <h3>Air Emission Trends</h3>
            <Line data={airData} />
          </div>

          <div className="box center">
            <h3>Compliance Status</h3>
            <div className="gauge">
              <div className="circle">
                {compliance.percentage}%
              </div>
              <p>
                {compliance.status === "SAFE"
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
                  <th>Date</th>
                  <th>Air</th>
                  <th>Fine</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r, i) => (
                  <tr key={i}>
                    <td>{factoryId}</td>
                    <td>{r.month}</td>
                    <td>{r.air}</td>
                    <td>₹{r.fine}</td>
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

        {/* SUBMIT */}
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
