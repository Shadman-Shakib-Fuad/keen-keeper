import { NavLink } from "react-router-dom";
import { Home, Clock, BarChart2 } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">KeenKeeper</div>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <Home size={16} /> Home
        </NavLink>
        <NavLink to="/timeline" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <Clock size={16} /> Timeline
        </NavLink>
        <NavLink to="/stats" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <BarChart2 size={16} /> Stats
        </NavLink>
      </div>
    </nav>
  );
}