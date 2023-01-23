import { Navbar, Sidebar } from "../../../component";
import { useSelector } from "react-redux";

export default function AdminAplikasiDashboard() {
  const name = useSelector((state) => state.auth.username);
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="w-100 p-3">
        <Navbar name={name} />

        <div>Hotel Terlaris</div>
        <div>Total Pemasukan</div>
        <div>New Order</div>
        <div>Order Reject</div>
        <div>All Order</div>
      </div>
    </div>
  );
}
