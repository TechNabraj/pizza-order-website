// src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav-inner">
        {/* LEFT: brand (direct child #1) */}
        <Link to="/" className="brand-block" aria-label="Komorebi Pizza - Home">
          <img src={logo} alt="Komorebi logo" className="brand-logo" />
          <div className="brand-text-vertical">
            <span className="brand-main">Komorebi</span>
            <span className="brand-sub">Pizza</span>
          </div>
        </Link>

        {/* RIGHT: links (direct child #2) */}
        <nav className="nav-links" aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
          <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
            Login
          </NavLink>
          <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>
            Register
          </NavLink>
          <NavLink to="/track-order" className={({ isActive }) => (isActive ? "active" : "")}>
            Track Order
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
