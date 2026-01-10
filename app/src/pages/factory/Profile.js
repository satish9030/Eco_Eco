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
  const [factory, setFactory] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/factory/dashboard/${factoryId}`)
      .then(res => res.json())
      .then(data => setFactory(data));
  }, [factoryId]);

  if (!factory) return null;

  return (
    <div className="profile-page">
      <div className="profile-card">

        {/* HEADER */}
        <div className="profile-header">
          <div className="profile-avatar">
            <MdFactory size={36} />
          </div>

          <div>
            <h1>{factory.name}</h1>
            <p className="profile-subtitle">
              Manufacturing Unit • {factory.status}
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
              <span className="value">{factoryId}</span>
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
              <span className="value">Manufacturing</span>
            </div>
          </div>

          <div className="detail-box">
            <div className="icon-circle green">
              <FaShieldAlt />
            </div>
            <div>
              <span className="label">Compliance Status</span>
              <span className="value safe">{factory.status}</span>
            </div>
          </div>

        </div>

        {/* EXTRA INFO */}
        <div className="profile-extra">

          <div className="extra-box">
            <FaIndustry className="extra-icon" />
            <h3>Allowed Limit</h3>
            <p>{factory.allowed_limit}</p>
          </div>

          <div className="extra-box">
            <FaStar className="extra-icon" />
            <h3>Environmental Rating</h3>
            <p>⭐ 4.5 / 5</p>
          </div>

          <div className="extra-box">
            <FaMoneyBillWave className="extra-icon" />
            <h3>Total Fines</h3>
            <p>₹{factory.latest_emission > factory.allowed_limit ? 500 : 0}</p>
          </div>

        </div>

      </div>
    </div>
  );
}
