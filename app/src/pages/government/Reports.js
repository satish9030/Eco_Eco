import "./Reports.css";
import { useEffect, useState } from "react";

export default function Reports() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("https://eco-eco-xxxx.onrender.com/monthly-report")
      .then(res => res.json())
      .then(data => {
        const list = Object.values(data.factories);
        setRows(list);
      });
  }, []);

  return (
    <div className="reports-dashboard">
      <h1>Compliance Reports</h1>

      <table>
        <thead>
          <tr>
            <th>Factory</th>
            <th>Emission</th>
            <th>Limit</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((f, i) => (
            <tr key={i}>
              <td>{f.name}</td>
              <td>{f.emission}</td>
              <td>{f.allowed_limit}</td>
              <td className={f.status === "EXCEEDED" ? "danger" : "safe"}>
                {f.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
