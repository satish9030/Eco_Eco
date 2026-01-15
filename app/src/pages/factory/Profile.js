import "./Profile.css";
import {
  FaIndustry,
  FaMapMarkerAlt,
  FaIdCard,
  FaShieldAlt,
  FaStar,
  FaMoneyBillWave
} from "react-icons/fa";
import { MdFactory } from "react-icons/md";
import { useEffect, useState } from "react";

export default function Profile() {
  const factoryId = localStorage.getItem("factoryId");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://eco-eco-xxxx.onrender.com/factory/dashboard/${factoryId}`)
      .then(res => res.json())
      .then(res => setData(res));
  }, [factoryId]);

  if (!data) return null;

  const { factory, today } = data;

  return (
    <div className="profile-page">
      <div className="profile-card">

        {/* HEADER */}
        <div className="profile-header">
          <div className="profile-avatar">
            <MdFactory size={34} />
          </div>

          <div>
            <h1>{factory.name}</h1>
            <p className="profile-subtitle">
              Manufacturing Unit • {today.status}
            </p>
          </div>
        </div>

        <div className="divider"></div>

        {/* DETAILS */}
        <div className="profile-details">

          <div className="detail-box">
            <div className="icon-circle">
              <FaIdCard />
            </div>
            <div>
              <span className="label">Factory ID</span>
              <span className="value small">{factoryId}</span>
            </div>
          </div>

          <div className="detail-box">
            <div className="icon-circle">
              <FaMapMarkerAlt />
            </div>
            <div>
              <span className="label">Location</span>
              <span className="value">{factory.city}</span>
            </div>
          </div>

          <div className="detail-box">
            <div className="icon-circle">
              <FaIndustry />
            </div>
            <div>
              <span className="label">Industry Type</span>
              <span className="value small">Manufacturing</span>
            </div>
          </div>

          <div className="detail-box">
            <div className="icon-circle green">
              <FaShieldAlt />
            </div>
            <div>
              <span className="label">Compliance Status</span>
              <span
                className={`value ${
                  today.status === "SAFE" ? "safe" : "danger"
                }`}
              >
                {today.status}
              </span>
            </div>
          </div>

        </div>

        {/* EXTRA INFO */}
        <div className="profile-extra">

          <div className="extra-box">
            <FaIndustry className="extra-icon" />
            <h3>Allowed Limit</h3>
            <p>{today.air_limit}</p>
          </div>

          <div className="extra-box">
            <FaStar className="extra-icon" />
            <h3>Environmental Rating</h3>
            <p>⭐ 4.5 / 5</p>
          </div>

          <div className="extra-box">
            <FaMoneyBillWave className="extra-icon" />
            <h3>Total Fines</h3>
            <p>₹{today.fine}</p>
          </div>

        </div>

      </div>
    </div>
  );
}
