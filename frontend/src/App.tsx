import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Incidents from "./pages/Incidents";
import "./App.css";
function App(){

  return (
    <>
      <nav className="navbar">
        <Link to="/">Dashboard</Link>
        <Link to="/history">History</Link>
        <Link to="/incidents">Incidents</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/incidents" element={<Incidents />} />
      </Routes>
    </>
  );
}

export default App;