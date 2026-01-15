import "./FactoryDetails.css";
import {
  FaCloud,
  FaTint,
  FaCheckCircle,
  FaExclamationTriangle,
  FaMapMarkerAlt
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function FactoryDetails() {
  const { state } = useLocation();
  const [factory, setFactory] = useState(null);
  const [history, setHistory] = useState([]);
  const [fine, setFine] = useState(0);

  useEffect(() => {
    fetch("https://eco-eco-xxxx.onrender.com/monthly-report")
      .then(res => res.json())
      .then(data => {
        setFactory(data.factories[state.factoryId]);
      });

    fetch(`https://eco-eco-xxxx.onrender.com/factory-history/${state.factoryId}`)
      .then(res => res.json())
      .then(setHistory);

    fetch(`https://eco-eco-xxxx.onrender.com/factory-fine/${state.factoryId}`)
      .then(res => res.json())
      .then(data => setFine(data.fine));
  }, [state.factoryId]);

  if (!factory) return <h2>Loading...</h2>;

  return (
    <div className="factory-details-page">

      {/* HEADER */}
      <div className="factory-header">
        <h1>{factory.name}</h1>
        <span className="location-badge">
          <FaMapMarkerAlt /> Delhi
        </span>
      </div>

      {/* FACTORY INFO */}
      <div className="factory-info-card">
        <h3>Factory Details</h3>
        <p><b>Month:</b> {factory.month}</p>
        <p><b>Emission:</b> {factory.emission}</p>
        <p><b>Allowed Limit:</b> {factory.allowed_limit}</p>
      </div>

      {/* LIMIT CARDS */}
      <div className="limit-cards">

        <div className="limit-card">
          <h3><FaCloud /> Air Emission</h3>
          <div className="limit-values">
            <div>
              <h2>{factory.allowed_limit}</h2>
              <p>Allowed</p>
            </div>
            <div>
              <h2>{factory.emission}</h2>
              <p>Current</p>
            </div>
          </div>

          <p className={`status ${factory.status === "EXCEEDED" ? "danger" : "safe"}`}>
            {factory.status === "EXCEEDED"
              ? <><FaExclamationTriangle /> Status: Exceeded</>
              : <><FaCheckCircle /> Status: Safe</>}
          </p>
        </div>

        <div className="limit-card">
          <h3><FaTint /> Water Emission</h3>
          <div className="limit-values">
            <div>
              <h2>50000</h2>
              <p>Allowed</p>
            </div>
            <div>
              <h2>42000</h2>
              <p>Current</p>
            </div>
          </div>
          <p className="status safe">
            <FaCheckCircle /> Status: Safe
          </p>
        </div>

      </div>

      {/* HISTORY TABLE */}
      <div className="emission-history">
        <h2>Emission History</h2>

        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Emission</th>
              <th>Allowed Limit</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {history.map((h, i) => (
              <tr key={i}>
                <td>{h.month}</td>
                <td>{h.emission}</td>
                <td>{h.allowed_limit}</td>
                <td className={h.status === "EXCEEDED" ? "danger" : "safe"}>
                  {h.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FINES */}
      <div className="fines-card">
        <h3>Fine</h3>
        <p><b>₹{fine}</b></p>
      </div>

    </div>
  );
}
