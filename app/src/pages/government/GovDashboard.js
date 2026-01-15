import "./GovDashboard.css";

import {
  FaIndustry,
  FaFileAlt,
  FaExclamationTriangle,
  FaChartLine,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function GovDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    exceeded: 0,
  });

  /* 🔐 AUTH GUARD — PREVENT UNAUTHORIZED ACCESS */
  useEffect(() => {
    const token = localStorage.getItem("gov_token");
    if (!token) {
      navigate("/gov/login", { replace: true });
    }
  }, [navigate]);

  /* 🚪 LOGOUT — CLEAR SESSION */
  const handleLogout = () => {
    localStorage.removeItem("gov_token");
    navigate("/gov/login", { replace: true });
  };

  /* 📊 FETCH STATS */
  useEffect(() => {
    fetch("https://eco-eco-xxxx.onrender.com/monthly-report")
      .then((res) => res.json())
      .then((data) => {
        const factories = Object.values(data.factories);
        const exceeded = factories.filter(
          (f) => f.status === "EXCEEDED"
        ).length;

        setStats({
          total: factories.length,
          exceeded,
        });
      });
  }, []);

  return (
    <div className="gov-page">
      {/* ================= NAVBAR ================= */}
      <nav className="gov-navbar">
        <Link
          to="/"
          className="logo"
          style={{ textDecoration: "none", cursor: "pointer" }}
        >
          Eco-Eco
        </Link>

        <ul>
          <li onClick={() => navigate("/gov/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/gov/factories")}>Factories</li>
          <li onClick={() => navigate("/gov/reports")}>Reports</li>
          <li onClick={() => navigate("/gov/complaints")}>Complaints</li>
        </ul>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* ================= HERO ================= */}
      <section className="gov-hero">
        <div className="hero-text">
          <h1>
            Government Portal for Monitoring and Controlling Factory Emissions
          </h1>

          <p>
            Enforce regulations, track pollution data, issue fines, and ensure
            environmental safety with Eco-Eco’s unified platform.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/gov/dashboard")}
            >
              Access Dashboard
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/gov/factories")}
            >
              Manage Factories
            </button>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="features">
        <div className="feature-card">
          <FaChartLine className="feature-icon" />
          <h3>Monitor Emissions</h3>
          <p>Track real-time pollution levels from registered factories.</p>
        </div>

        <div className="feature-card">
          <FaExclamationTriangle className="feature-icon" />
          <h3>Issue Fines & Warnings</h3>
          <p>Factories exceeding limits are automatically flagged.</p>
        </div>

        <div className="feature-card">
          <FaFileAlt className="feature-icon" />
          <h3>Generate Reports</h3>
          <p>Analyze compliance reports from live factory data.</p>
        </div>
      </section>

      {/* ================= OVERVIEW ================= */}
      <section className="overview">
        <h2>Factory Emissions Overview</h2>
        <p>Live backend-driven statistics</p>

        <div className="overview-card">
          <FaIndustry className="overview-icon" />
          <div>
            <h3>Registered Factories</h3>
            <p>{stats.total} Active Factories</p>
          </div>
        </div>

        <div className="overview-card danger">
          <FaExclamationTriangle className="overview-icon" />
          <div>
            <h3>Violations</h3>
            <p>{stats.exceeded} Factories Exceeded Limits</p>
          </div>
        </div>
      </section>
    </div>
  );
}
