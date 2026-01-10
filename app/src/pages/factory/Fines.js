import { useEffect, useState } from "react";
import "./Fines.css";

export default function Fines() {
  const factoryId = localStorage.getItem("factoryId");
  const [fine, setFine] = useState(0);
  const [status, setStatus] = useState("OK");

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/factory/dashboard/${factoryId}`)
      .then(res => res.json())
      .then(data => {
        setStatus(data.status);
      });

    fetch(`http://127.0.0.1:5000/factory-fine/${factoryId}`)
      .then(res => res.json())
      .then(data => {
        setFine(data.fine);
      });
  }, [factoryId]);

  return (
    <>
      <h1>Fines Overview</h1>

      <div className="fine-cards">
        <div className="fine-card">
          Active Fines
          <b>₹{fine}</b>
        </div>

        <div className="fine-card">
          Compliance Status
          <b>{status}</b>
        </div>

        <div className="fine-card">
          Paid Fines
          <b>₹0</b>
        </div>
      </div>
    </>
  );
}
