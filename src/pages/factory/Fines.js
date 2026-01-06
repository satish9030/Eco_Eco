import "./Fines.css";

export default function Fines() {
  return (
    <>
      <h1>Fines Overview</h1>

      <div className="fine-cards">
        <div className="fine-card">
          Active Fines
          <b>₹500</b>
        </div>

        <div className="fine-card">
          Paid Fines
          <b>₹1500</b>
        </div>
      </div>
    </>
  );
}
