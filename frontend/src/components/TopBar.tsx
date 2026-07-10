import { Menu, Shield } from "lucide-react";
import "./TopBar.css";

interface TopBarProps {
  toggle: () => void;
}

export default function TopBar({ toggle }: TopBarProps) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-btn" onClick={toggle}>
          <Menu size={22} />
        </button>

        <Shield size={26} className="logo-icon" />

        <h2>SentinelOps</h2>
      </div>

      <div className="topbar-right">
        {/* Future:
            Notifications
            Theme Toggle
            User Profile
        */}
      </div>
    </header>
  );
}