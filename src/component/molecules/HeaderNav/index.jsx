import { NavLink } from "react-router-dom";
import "./style.css";

export default function HeaderNav() {
  const navLink = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#0364CE" : "",
      color: isActive ? "white" : "gray",
    };
  };

  return (
    <div className="header-nav">
      <NavLink style={navLink} to="/keuangan" className="nav-item">
        Pemesanan Baru
      </NavLink>
      <NavLink style={navLink} to="/" className="nav-item">
        Diproses
      </NavLink>
      <NavLink style={navLink} to="/" className="nav-item">
        Reservasi ditolak
      </NavLink>
      <NavLink style={navLink} to="/" className="nav-item">
        Pembayaran ditolak
      </NavLink>
      <NavLink style={navLink} to="/" className="nav-item">
        History
      </NavLink>
    </div>
  );
}
