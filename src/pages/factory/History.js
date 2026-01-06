import "./History.css";

export default function History() {
  const data = [
    { date: "Yesterday", air: 95, water: 70, status: "SAFE" },
    { date: "2 Days Ago", air: 120, water: 90, status: "EXCEEDED" }
  ];

  return (
    <>
      <h1>Emission History</h1>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Air</th>
            <th>Water</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((d,i) => (
            <tr key={i}>
              <td>{d.date}</td>
              <td>{d.air}</td>
              <td>{d.water}</td>
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
