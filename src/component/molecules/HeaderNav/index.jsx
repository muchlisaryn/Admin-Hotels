import { NavLink } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux";

export default function HeaderNav() {
  const data = useSelector((state) => state.booking.booking);

  const newOrder = data?.filter(
    (item) => item.statusPayment === "Pembayaran Sedang di verifikasi"
  );

  const processOrder = data?.filter(
    (item) => item.statusOrder === "Menunggu Konfirmasi Hotel"
  );

  const PaymentFailed = data?.filter(
    (item) => item.statusPayment === "Pembayaran ditolak"
  );

  console.log("ini new Order", newOrder);

  const navLink = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#0364CE" : "",
      color: isActive ? "white" : "gray",
    };
  };

  return (
    <div className="header-nav">
      <NavLink
        style={navLink}
        to="/admin/keuangan/pemesanan-baru"
        className="nav-item"
      >
        {`Pemesanan Baru (${newOrder?.length})`}
      </NavLink>
      <NavLink
        style={navLink}
        to="/admin/keuangan/Diproses"
        className="nav-item"
      >
        {`Diproses (${processOrder?.length})`}
      </NavLink>
      <NavLink
        style={navLink}
        to="/admin/keuangan/berhasil"
        className="nav-item"
      >
        Berhasil
      </NavLink>
      <NavLink
        style={navLink}
        to="/admin/keuangan/pemesanan-ditolak"
        className="nav-item"
      >
        Reservasi ditolak
      </NavLink>
      <NavLink
        style={navLink}
        to="/admin/keuangan/pembayaran-ditolak"
        className="nav-item"
      >
        {` Pembayaran ditolak (${PaymentFailed?.length})`}
      </NavLink>
      <NavLink
        style={navLink}
        to="/admin/keuangan/history"
        className="nav-item"
      >
        History
      </NavLink>
    </div>
  );
}
