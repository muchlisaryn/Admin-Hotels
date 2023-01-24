import { NavLink } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux";

export default function HeaderNav({
  orderNew,
  success,
  failed,
  OrderFailed,
  process,
  payFailed,
}) {
  const role = useSelector((state) => state.auth.role);

  const navLink = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#0364CE" : "",
      color: isActive ? "white" : "gray",
    };
  };

  return (
    <div className="header-nav">
      {role === "Admin Hotel" ? (
        <>
          <NavLink
            style={navLink}
            to="/admin/Hotel/Pemesanan/new-order"
            className="nav-item"
          >
            {`Pemesanan Baru (${orderNew})`}
          </NavLink>
          <NavLink
            style={navLink}
            to="/admin/Hotel/Pemesanan/success-order"
            className="nav-item"
          >
            {`Pemesanan Berhasil (${success})`}
          </NavLink>
          <NavLink
            style={navLink}
            to="/admin/Hotel/Pemesanan/failed-order"
            className="nav-item"
          >
            {`Pemesanan ditolak (${failed})`}
          </NavLink>
        </>
      ) : (
        <></>
      )}

      {role === "Admin Keuangan" ? (
        <>
          <NavLink
            style={navLink}
            to="/admin/keuangan/pemesanan/pemesanan-baru"
            className="nav-item"
          >
            {`Pemesanan Baru (${orderNew})`}
          </NavLink>
          <NavLink
            style={navLink}
            to="/admin/keuangan/pemesanan/Diproses"
            className="nav-item"
          >
            {`Diproses (${process})`}
          </NavLink>
          <NavLink
            style={navLink}
            to="/admin/keuangan/pemesanan/Berhasil"
            className="nav-item"
          >
            Berhasil ({success})
          </NavLink>
          <NavLink
            style={navLink}
            to="/admin/keuangan/pemesanan/Reservasi-ditolak"
            className="nav-item"
          >
            {`Reservasi ditolak (${OrderFailed})`}
          </NavLink>
          <NavLink
            style={navLink}
            to="/admin/keuangan/pembayaran-ditolak"
            className="nav-item"
          >
            {` Pembayaran ditolak (${payFailed})`}
          </NavLink>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
