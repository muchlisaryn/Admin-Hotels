import { NavLink } from "react-router-dom";
import "./style.css";

export default function Header() {
  const navLink = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#0364CE" : "",
      color: isActive ? "white" : "",
    };
  };

  return (
    <>
      <NavLink
        className="nav-item"
        style={navLink}
        to="/admin/aplikasi/kelolaUser/all-user"
      >
        All User
      </NavLink>
      <NavLink
        className="nav-item"
        style={navLink}
        to="/admin/aplikasi/kelolaUser/konsumen"
      >
        Konsumen
      </NavLink>
      <NavLink
        className="nav-item"
        style={navLink}
        to="/admin/aplikasi/kelolaUser/Admin"
      >
        Admin
      </NavLink>
      <NavLink
        className="nav-item"
        style={navLink}
        to="/admin/aplikasi/kelolaUser/hotel"
      >
        Hotel
      </NavLink>
    </>
  );
}
