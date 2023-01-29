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
  NewOrderHotel,
  SuccessOrderHotel,
  FailedOrderHotel,
  ReservasiReject,
  HomeKeuangan,
  RekapitulasiOrderHotel,
  DetailRekapitulasiHotel,
} from "./pages";
import {
  DetailRekapitulasi,
  EditFee,
  EditRekening,
  KelolaKeuangan,
  NewOrder,
  OrderProses,
  PaymentFailed,
  RekapitulasiKeuangan,
  TransactionsSuccess,
} from "./pages/AdminKeuangan";
import HomeHotel from "./pages/AdminHotel/Home";
import RekapitulasiOrder from "./pages/AdminKeuangan/RekapitulasiOrder";

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
          path="/admin/keuangan/rekapitulasi"
          element={<RekapitulasiKeuangan />}
        />
        <Route
          path="/admin/keuangan/rekapitulasi/detail-rekapitulasi/:id"
          element={<DetailRekapitulasi />}
        />
        <Route
          path="/admin/keuangan/rekapitulasi-hotel"
          element={<RekapitulasiOrder />}
        />
        <Route path="/admin/keuangan/pemesanan" element={<HomeKeuangan />} />

        <Route
          path="/admin/keuangan/pemesanan/pemesanan-baru"
          element={<NewOrder />}
        />
        <Route
          path="/admin/keuangan/pemesanan/Berhasil"
          element={<TransactionsSuccess />}
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
          path="/admin/keuangan/pemesanan/Reservasi-ditolak"
          element={<ReservasiReject />}
        />
        <Route
          path="/admin/keuangan/Kelola-keuangan"
          element={<KelolaKeuangan />}
        />
        <Route
          path="/admin/keuangan/Kelola-keuangan/edit-rekening/:id"
          element={<EditRekening />}
        />
        <Route
          path="/admin/keuangan/Kelola-keuangan/edit-fee/:id"
          element={<EditFee />}
        />
        <Route path="/admin/Hotel/Pemesanan" element={<HomeHotel />} />
        <Route
          path="/admin/Hotel/Rekapitulasi"
          element={<RekapitulasiOrderHotel />}
        />
        <Route
          path="/admin/Hotel/Rekapitulasi/detail-rekapitulasi/:id"
          element={<DetailRekapitulasiHotel />}
        />
        <Route
          path="/admin/Hotel/Pemesanan/new-order"
          element={<NewOrderHotel />}
        />
        <Route
          path="/admin/Hotel/Pemesanan/success-order"
          element={<SuccessOrderHotel />}
        />
        <Route
          path="/admin/Hotel/Pemesanan/failed-order"
          element={<FailedOrderHotel />}
        />
        <Route
          path="/admin/Hotel/Pemesanan/detail-pemesanan/:id"
          element={<DetailPemesanan />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
