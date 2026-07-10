import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  History,
  TriangleAlert,
} from "lucide-react";

import "./Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
}

function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

  return (
    <aside className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
      <nav>
        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
        >
          <LayoutDashboard size={20} />
          {isOpen && <span>Dashboard</span>}
        </Link>

        <Link
          to="/history"
          className={location.pathname === "/history" ? "active" : ""}
        >
          <History size={20} />
          {isOpen && <span>History</span>}
        </Link>

        <Link
          to="/incidents"
          className={location.pathname === "/incidents" ? "active" : ""}
        >
          <TriangleAlert size={20} />
          {isOpen && <span>Incidents</span>}
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;