// import { useNavigate } from "react-router-dom";
// import "./Dashboard.css";

// function Dashboard() {
//   const navigate = useNavigate();

//   const history = [
//     { date: "Yesterday", air: 95, water: 70, status: "SAFE", fine: 0 },
//     { date: "2 Days Ago", air: 110, water: 85, status: "LIMIT EXCEEDED", fine: 500 },
//     { date: "3 Days Ago", air: 90, water: 60, status: "SAFE", fine: 0 },
//   ];

//   return (
//     <div className="dash-bg">
//       {/* HEADER */}
//       <div className="dash-header">
//         <h1 className="dash-title">Factory Control Center</h1>
//         <button
//           className="submit-btn"
//           onClick={() => navigate("/submit")}
//         >
//           + Submit Emission
//         </button>
//       </div>

//       {/* TOP CARDS */}
//       <div className="cards">
//         <div className="card blue">
//           Air Limit
//           <b>100 units</b>
//         </div>

//         <div className="card cyan">
//           Water Limit
//           <b>80 units</b>
//         </div>

//         <div className="card green">
//           Status
//           <b>SAFE</b>
//         </div>

//         <div className="card yellow">
//           Stars
//           <b>⭐ 1</b>
//         </div>

//         <div className="card red">
//           Fine
//           <b>₹0</b>
//         </div>
//       </div>

//       {/* HISTORY */}
//       <div className="history">
//         <h2>Emission History</h2>

//         <table>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Air Emission</th>
//               <th>Water Emission</th>
//               <th>Status</th>
//               <th>Fine (₹)</th>
//             </tr>
//           </thead>

//           <tbody>
//             {history.map((row, i) => (
//               <tr key={i}>
//                 <td>{row.date}</td>
//                 <td>{row.air}</td>
//                 <td>{row.water}</td>
//                 <td>
//                   <span className={row.status === "SAFE" ? "safe" : "danger"}>
//                     {row.status}
//                   </span>
//                 </td>
//                 <td>{row.fine}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <>
      <h1>Today’s Emission Status</h1>

      <div className="cards">
        <div className="card air">
          Air Emission
          <b>95 / 100</b>
        </div>

        <div className="card water">
          Water Emission
          <b>70 / 80</b>
        </div>

        <div className="card status">
          Status
          <b>SAFE</b>
        </div>

        <div className="card fine">
          Today Fine
          <b>₹0</b>
        </div>
      </div>
    </>
  );
}
