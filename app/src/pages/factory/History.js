import { useEffect, useState } from "react";
import "./History.css";

export default function History() {
  const factoryId = localStorage.getItem("factoryId");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch(`https://eco-eco-xxxx.onrender.com/factory-history/${factoryId}`)
      .then(res => res.json())
      .then(data => setRows(data));
  }, [factoryId]);

  return (
    <>
      <h1>Emission History</h1>

      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Emission</th>
            <th>Allowed</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((d, i) => (
            <tr key={i}>
              <td>{d.month}</td>
              <td>{d.emission}</td>
              <td>{d.allowed_limit}</td>
              <td className={d.status === "SAFE" ? "safe" : "danger"}>
                {d.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
