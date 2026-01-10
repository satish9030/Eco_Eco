import { NavLink, Outlet } from "react-router-dom";
import "./FactoryLayout.css";

export default function FactoryLayout() {
  return (
    <div className="factory-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">Eco-Eco</h2>

        <NavLink to="dashboard">Dashboard</NavLink>
        <NavLink to="history">History</NavLink>
        <NavLink to="fines">Fines</NavLink>
        <NavLink to="profile">Profile</NavLink>
      </aside>

      {/* MAIN */}
      <div className="main">
        <header className="topbar">
          <span>Factory Control Center</span>
          {/* ❌ Logout button removed */}
        </header>

        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
