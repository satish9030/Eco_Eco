import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

/* Main */
import Main from "./pages/main";

/* People */
import PeopleHome from "./pages/people/peoplehome";
import PeopleLogin from "./pages/people/peoplelogin";
import PeopleRegister from "./pages/people/peopleregister";
import PeopleDashboard from "./pages/people/peopledashboard";

/* Factory */
import Home from "./pages/factory/Home";
import Login from "./pages/factory/Login";
import Register from "./pages/factory/Register";
import FactoryLayout from "./pages/factory/FactoryLayout";
import Dashboard from "./pages/factory/Dashboard";
import History from "./pages/factory/History";
import Fines from "./pages/factory/Fines";
import Profile from "./pages/factory/Profile";
import SubmitEmission from "./pages/factory/SubmitEmission";

/* Government */
import GovLogin from "./pages/government/GovLogin";
import GovDashboard from "./pages/government/GovDashboard";

function App() {
  return (
    <Routes>
      {/* MAIN */}
      <Route path="/" element={<Main />} />

      {/* PEOPLE */}
      <Route path="/people" element={<PeopleHome />} />
      <Route path="/people/login" element={<PeopleLogin />} />
      <Route path="/people/register" element={<PeopleRegister />} />
      <Route path="/people/dashboard" element={<PeopleDashboard />} />

      {/* FACTORY AUTH */}
      <Route path="/factory" element={<Home />} />
      <Route path="/factory/login" element={<Login />} />
      <Route path="/factory/register" element={<Register />} />

      {/* FACTORY DASHBOARD */}
      <Route path="/factory" element={<FactoryLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="history" element={<History />} />
        <Route path="fines" element={<Fines />} />
        <Route path="profile" element={<Profile />} />
        <Route path="submit" element={<SubmitEmission />} />
      </Route>

      {/* GOVERNMENT */}
      <Route path="/gov/login" element={<GovLogin />} />
      <Route path="/gov/dashboard" element={<GovDashboard />} />

      {/* SAFETY REDIRECTS */}
      <Route path="/login" element={<Navigate to="/factory/login" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
