import { Navbar, Sidebar } from "../../../component";

export default function AdminAplikasiDashboard() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="w-100 p-3">
        <Navbar />

        <div>Hotel Terlaris</div>
        <div>Total Pemasukan</div>
        <div>New Order</div>
        <div>Order Reject</div>
        <div>All Order</div>
      </div>
    </div>
  );
}
