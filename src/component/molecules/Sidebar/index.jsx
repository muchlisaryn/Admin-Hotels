import Button from "../../Button";
import Logo from "../../Logo";
import "./style.css";
import { colors } from "../../../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchBooking } from "../../../features/getBookingSlice";
import { useEffect } from "react";

export default function Sidebar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const dataOrder = useSelector((state) => state.booking.booking);

  useEffect(() => {
    dispatch(fetchBooking());
  }, []);

  console.log(dataOrder);
  const navLink = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#0364CE" : "",
      color: isActive ? "white" : "",
    };
  };
  return (
    <div>
      <div className="sidebar d-flex flex-column">
        <div style={{ padding: 20 }}>
          <Logo size={140} />
        </div>

        {user?.role === "Admin Aplikasi" ? (
          <>
            <NavLink
              className="menu-item border-bottom border-top"
              style={navLink}
              to="/admin/aplikasi/Dashboard"
            >
              Dashboard
            </NavLink>
            <NavLink
              className="menu-item border-bottom"
              style={navLink}
              to="/user"
            >
              Kelola User
            </NavLink>
            <NavLink
              className="menu-item border-bottom"
              style={navLink}
              to="/admin/aplikasi/rekapitulasi"
            >
              {`All Order (${dataOrder?.length})`}
            </NavLink>
          </>
        ) : (
          <></>
        )}
        {user?.role === "Admin Keuangan" ? (
          <>
            {" "}
            <NavLink
              className="menu-item border-bottom border-top "
              style={navLink}
              to="/"
            >
              Pemesanan
            </NavLink>
            <NavLink
              className="menu-item border-bottom"
              style={navLink}
              to="/keuangan"
            >
              Rekapitulasi
            </NavLink>
            <NavLink className="menu-item border-bottom" style={navLink} to="/">
              Rekening Aplikasi
            </NavLink>
            <NavLink className="menu-item border-bottom" style={navLink} to="/">
              Kelola Keuangan
            </NavLink>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
