import Logo from "../../Logo";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchBooking } from "../../../features/getBookingSlice";
import { useEffect } from "react";

export default function Sidebar() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
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

        {role === "Admin Hotel" ? (
          <>
            <NavLink
              className="menu-item border-bottom border-top"
              style={navLink}
              to="/admin/Hotel/Pemesanan"
            >
              Pemesanan
            </NavLink>

            <NavLink
              className="menu-item border-bottom"
              style={navLink}
              to="/admin/Hotel/Rekapitulasi"
            >
              {`Rekapitulasi`}
            </NavLink>
          </>
        ) : (
          <></>
        )}

        {role === "Admin Aplikasi" ? (
          <>
            {/* <NavLink
              className="menu-item border-bottom border-top"
              style={navLink}
              to="/admin/aplikasi/Dashboard"
            >
              Dashboard
            </NavLink> */}
            <NavLink
              className="menu-item border-bottom"
              style={navLink}
              to="/admin/aplikasi/kelolaUser/all-user"
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
        {role === "Admin Keuangan" ? (
          <>
            {" "}
            <NavLink
              className="menu-item border-bottom border-top "
              style={navLink}
              to="/admin/keuangan/pemesanan"
            >
              Pemesanan
            </NavLink>
            <NavLink
              className="menu-item border-bottom"
              style={navLink}
              to="/admin/keuangan/rekapitulasi"
            >
              Rekapitulasi Order
            </NavLink>
            <NavLink
              className="menu-item border-bottom"
              style={navLink}
              to="/admin/keuangan/rekapitulasi-hotel"
            >
              Rekapitulasi Hotel
            </NavLink>
            <NavLink
              className="menu-item border-bottom"
              style={navLink}
              to="/admin/keuangan/Kelola-keuangan"
            >
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
