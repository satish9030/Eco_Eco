import { useEffect, useState } from "react";
import "./Fines.css";

export default function Fines() {
  const factoryId = localStorage.getItem("factoryId");

  const [fine, setFine] = useState(0);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch(`https://eco-eco-xxxx.onrender.com/factory/dashboard/${factoryId}`)
      .then((res) => res.json())
      .then((data) => {
        // ✅ CORRECT PATH
        setStatus(data.today.status);
        setFine(data.today.fine);
      })
      .catch(() => {
        setStatus("ERROR");
      });
  }, [factoryId]);

  return (
    <>
      <h1>Fines Overview</h1>

      <div className="fine-cards">
        {/* ACTIVE FINES */}
        <div className="fine-card">
          Active Fines
          <b>₹{fine}</b>
        </div>

        {/* COMPLIANCE STATUS */}
        <div className="fine-card">
          Compliance Status
          {status ? (
            <b className={status === "SAFE" ? "status-safe" : "status-danger"}>
              {status}
            </b>
          ) : (
            <b>Loading...</b>
          )}
        </div>

        {/* PAID FINES */}
        <div className="fine-card">
          Paid Fines
          <b>₹0</b>
        </div>
      </div>
    </>
  );
}
