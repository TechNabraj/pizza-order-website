import { Link } from "react-router-dom";
import logo from "../assets/images/logo.jpg"; // update if different

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="brand">
        <img src={logo} alt="Komorebi" />
        <strong>Komorebi Pizza</strong>
      </div>
      <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
        <Link to="/menu">Menu</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}
