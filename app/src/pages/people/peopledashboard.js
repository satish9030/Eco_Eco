// import "./peopledashboard.css";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend
// } from "chart.js";

// import { FaWind, FaWater, FaVolumeUp } from "react-icons/fa";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMap
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { useEffect, useState, useRef } from "react";

// /* Leaflet marker fix */
// import L from "leaflet";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// const DefaultIcon = L.icon({
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34]
// });
// L.Marker.prototype.options.icon = DefaultIcon;

// /* Chart register */
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend
// );

// const CITY_COORDS = {
//   Delhi: [28.6139, 77.2090],
//   Mumbai: [19.0760, 72.8777],
//   Hyderabad: [17.3850, 78.4867]
// };

// /* 🔒 Map controller — FACTORY ONLY */
// function FactoryMapController({ factoryCenter }) {
//   const map = useMap();
//   const hasMovedRef = useRef(false);

//   useEffect(() => {
//     if (!factoryCenter) return;
//     map.flyTo(factoryCenter, 12, { animate: true, duration: 1 });
//     hasMovedRef.current = true;
//   }, [factoryCenter, map]);

//   return null;
// }

// export default function PeopleDashboard() {
//   const [cities] = useState(["Delhi", "Mumbai", "Hyderabad"]);
//   const [selectedCity, setSelectedCity] = useState("");
//   const [factories, setFactories] = useState([]);
//   const [selectedFactory, setSelectedFactory] = useState("");

//   const [aqi, setAqi] = useState(null);
//   const [chartData, setChartData] = useState(null);

//   /* 🔴 ONLY map trigger */
//   const [factoryCenter, setFactoryCenter] = useState(null);

//   /* CITY CHANGE → DATA ONLY */
//   useEffect(() => {
//     if (!selectedCity) {
//       setFactories([]);
//       setSelectedFactory("");
//       setAqi(null);
//       setChartData(null);
//       return;
//     }

//     fetch(`http://127.0.0.1:5000/public-report/${selectedCity}`)
//       .then(res => res.json())
//       .then(data => {
//         setFactories(data.factories || []);
//         setSelectedFactory("");
//         setAqi(null);
//         setChartData(null);
//       });
//   }, [selectedCity]);

//   /* FACTORY CHANGE → AQI + CHART + MAP */
//   useEffect(() => {
//     if (!selectedFactory) return;

//     const factory = factories.find(f => f.name === selectedFactory);
//     if (!factory) return;

//     setAqi(factory.aqi ?? 100);
//     setFactoryCenter(CITY_COORDS[selectedCity]);

//     const base = factory.emission;
//     const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];

//     setChartData({
//       labels: months,
//       datasets: [
//         {
//           label: "CO₂",
//           data: months.map((_, i) => base * 0.6 * (1 + i * 0.04)),
//           borderColor: "#1976d2",
//           tension: 0.45,
//           pointRadius: 0,
//           borderWidth: 3
//         },
//         {
//           label: "PM2.5",
//           data: months.map((_, i) => base * 0.25 * (1 - i * 0.03)),
//           borderColor: "#43a047",
//           tension: 0.4,
//           pointRadius: 0,
//           borderWidth: 3
//         },
//         {
//           label: "NOx",
//           data: months.map((_, i) => base * 0.15 * (1 + (i % 2) * 0.05)),
//           borderColor: "#fb8c00",
//           tension: 0.35,
//           pointRadius: 0,
//           borderWidth: 3
//         }
//       ]
//     });
//   }, [selectedFactory, factories, selectedCity]);

//   const factoryData = factories.find(f => f.name === selectedFactory);

//   return (
//     <div className="people-dashboard">

//       {/* HEADER */}
//       <div className="dashboard-header">
//         <h1>Public Pollution Dashboard</h1>

//         <div className="filters">
//           <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
//             <option value="">Select City</option>
//             {cities.map(c => (
//               <option key={c} value={c}>{c}</option>
//             ))}
//           </select>

//           <select
//             value={selectedFactory}
//             onChange={e => setSelectedFactory(e.target.value)}
//             disabled={!selectedCity}
//           >
//             <option value="">Select Factory</option>
//             {factories.map(f => (
//               <option key={f.name} value={f.name}>{f.name}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* METRICS */}
//       <div className="metric-cards">
//         <div className="metric-card air-border">
//           <FaWind />
//           <h3>AQI</h3>
//           <p>{aqi ?? "--"}</p>
//         </div>

//         <div className="metric-card water-border">
//           <FaWater />
//           <h3>Water Quality</h3>
//           <p>{aqi ? Math.max(40, 100 - aqi / 2) : "--"}</p>
//         </div>

//         <div className="metric-card noise-border">
//           <FaVolumeUp />
//           <h3>Noise Level</h3>
//           <p>{aqi ? `${50 + aqi / 2} dB` : "--"}</p>
//         </div>
//       </div>

//       {/* CHART + MAP */}
//       <div className="main-section">
//         <div className="chart-box" style={{ height: "300px" }}>
//           <h3>Emission Trends</h3>
//           {chartData
//             ? <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
//             : "Select a factory"}
//         </div>

//         <div className="map-box">
//           <MapContainer center={[20.5937, 78.9629]} zoom={5} className="map">
//             <FactoryMapController factoryCenter={factoryCenter} />
//             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//             {factoryCenter && (
//               <Marker position={factoryCenter}>
//                 <Popup>📍</Popup>
//               </Marker>
//             )}
//           </MapContainer>
//         </div>
//       </div>

//       {/* 🔥 TABLE (RESTORED) */}
//       <div className="table-box">
//         <table>
//           <thead>
//             <tr>
//               <th>Factory</th>
//               <th>Emission</th>
//               <th>Allowed Limit</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {factoryData ? (
//               <tr>
//                 <td>{factoryData.name}</td>
//                 <td>{factoryData.emission}</td>
//                 <td>{factoryData.allowed_limit}</td>
//                 <td>{factoryData.status}</td>
//               </tr>
//             ) : (
//               <tr>
//                 <td colSpan="4">Select a factory</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//     </div>
//   );
// }
import "./peopledashboard.css";
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

import { FaWind, FaWater, FaVolumeUp } from "react-icons/fa";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* Leaflet marker fix */
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});
L.Marker.prototype.options.icon = DefaultIcon;

/* Chart register */
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const CITY_COORDS = {
  Delhi: [28.6139, 77.2090],
  Mumbai: [19.0760, 72.8777],
  Hyderabad: [17.3850, 78.4867]
};

/* 🔒 Map controller — FACTORY ONLY */
function FactoryMapController({ factoryCenter }) {
  const map = useMap();
  const hasMovedRef = useRef(false);

  useEffect(() => {
    if (!factoryCenter) return;
    map.flyTo(factoryCenter, 12, { animate: true, duration: 1 });
    hasMovedRef.current = true;
  }, [factoryCenter, map]);

  return null;
}

export default function PeopleDashboard() {
  const navigate = useNavigate();

  const [cities] = useState(["Delhi", "Mumbai", "Hyderabad"]);
  const [selectedCity, setSelectedCity] = useState("");
  const [factories, setFactories] = useState([]);
  const [selectedFactory, setSelectedFactory] = useState("");

  const [aqi, setAqi] = useState(null);
  const [chartData, setChartData] = useState(null);

  /* 🔴 ONLY map trigger */
  const [factoryCenter, setFactoryCenter] = useState(null);

  /* 🔐 AUTH GUARD */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/people/login", { replace: true });
    }
  }, [navigate]);

  /* LOGOUT */
  const handleLogout = () => {
    localStorage.clear();
    navigate("/people/login", { replace: true });
  };

  /* CITY CHANGE → DATA ONLY */
  useEffect(() => {
    if (!selectedCity) {
      setFactories([]);
      setSelectedFactory("");
      setAqi(null);
      setChartData(null);
      return;
    }

    fetch(`http://127.0.0.1:5000/public-report/${selectedCity}`)
      .then(res => res.json())
      .then(data => {
        setFactories(data.factories || []);
        setSelectedFactory("");
        setAqi(null);
        setChartData(null);
      });
  }, [selectedCity]);

  /* FACTORY CHANGE → AQI + CHART + MAP */
  useEffect(() => {
    if (!selectedFactory) return;

    const factory = factories.find(f => f.name === selectedFactory);
    if (!factory) return;

    setAqi(factory.aqi ?? 100);
    setFactoryCenter(CITY_COORDS[selectedCity]);

    const base = factory.emission;
    const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];

    setChartData({
      labels: months,
      datasets: [
        {
          label: "CO₂",
          data: months.map((_, i) => base * 0.6 * (1 + i * 0.04)),
          borderColor: "#1976d2",
          tension: 0.45,
          pointRadius: 0,
          borderWidth: 3
        },
        {
          label: "PM2.5",
          data: months.map((_, i) => base * 0.25 * (1 - i * 0.03)),
          borderColor: "#43a047",
          tension: 0.4,
          pointRadius: 0,
          borderWidth: 3
        },
        {
          label: "NOx",
          data: months.map((_, i) => base * 0.15 * (1 + (i % 2) * 0.05)),
          borderColor: "#fb8c00",
          tension: 0.35,
          pointRadius: 0,
          borderWidth: 3
        }
      ]
    });
  }, [selectedFactory, factories, selectedCity]);

  const factoryData = factories.find(f => f.name === selectedFactory);

  return (
    <div className="people-dashboard">

      {/* HEADER */}
      <div className="dashboard-header">
        <h1>Public Pollution Dashboard</h1>

        <div className="filters">
          <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
            <option value="">Select City</option>
            {cities.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={selectedFactory}
            onChange={e => setSelectedFactory(e.target.value)}
            disabled={!selectedCity}
          >
            <option value="">Select Factory</option>
            {factories.map(f => (
              <option key={f.name} value={f.name}>{f.name}</option>
            ))}
          </select>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* METRICS */}
      <div className="metric-cards">
        <div className="metric-card air-border">
          <FaWind />
          <h3>AQI</h3>
          <p>{aqi ?? "--"}</p>
        </div>

        <div className="metric-card water-border">
          <FaWater />
          <h3>Water Quality</h3>
          <p>{aqi ? Math.max(40, 100 - aqi / 2) : "--"}</p>
        </div>

        <div className="metric-card noise-border">
          <FaVolumeUp />
          <h3>Noise Level</h3>
          <p>{aqi ? `${50 + aqi / 2} dB` : "--"}</p>
        </div>
      </div>

      {/* CHART + MAP */}
      <div className="main-section">
        <div className="chart-box" style={{ height: "300px" }}>
          <h3>Emission Trends</h3>
          {chartData
            ? <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            : "Select a factory"}
        </div>

        <div className="map-box">
          <MapContainer center={[20.5937, 78.9629]} zoom={5} className="map">
            <FactoryMapController factoryCenter={factoryCenter} />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {factoryCenter && (
              <Marker position={factoryCenter}>
                <Popup>📍</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th>Factory</th>
              <th>Emission</th>
              <th>Allowed Limit</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {factoryData ? (
              <tr>
                <td>{factoryData.name}</td>
                <td>{factoryData.emission}</td>
                <td>{factoryData.allowed_limit}</td>
                <td>{factoryData.status}</td>
              </tr>
            ) : (
              <tr>
                <td colSpan="4">Select a factory</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
