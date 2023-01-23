import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AdminUser,
  Login,
  EditUser,
  CreateUser,
  AdminAplikasiRekapitulasi,
  AdminAplikasiDashboard,
  DetailPemesanan,
} from "./pages";
import {
  EditRekening,
  KelolaKeuangan,
  NewOrder,
  OrderProses,
  PaymentFailed,
} from "./pages/AdminKeuangan";
import HotelOrder from "./pages/AdminHotel/Pemesanan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/aplikasi/kelolaUser" element={<AdminUser />} />
        <Route
          path="/admin/aplikasi/rekapitulasi"
          element={<AdminAplikasiRekapitulasi />}
        />
        <Route
          path="/admin/aplikasi/Dashboard"
          element={<AdminAplikasiDashboard />}
        />
        <Route path="user/edit-user/:id" element={<EditUser />} />
        <Route path="user/create-user" element={<CreateUser />} />

        <Route
          path="/admin/keuangan/pemesanan/pemesanan-baru"
          element={<NewOrder />}
        />
        <Route
          path="/admin/keuangan/pemesanan/Diproses"
          element={<OrderProses />}
        />
        <Route
          path="/admin/keuangan/pemesanan/Pembayaran-ditolak"
          element={<PaymentFailed />}
        />
        <Route
          path="/admin/keuangan/Kelola-keuangan"
          element={<KelolaKeuangan />}
        />
        <Route
          path="/admin/keuangan/Kelola-keuangan/edit-rekening/:id"
          element={<EditRekening />}
        />
        <Route path="/admin/Hotel/Pemesanan" element={<HotelOrder />} />
        <Route
          path="/admin/Hotel/Pemesanan/detail-pemesanan/:id"
          element={<DetailPemesanan />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
