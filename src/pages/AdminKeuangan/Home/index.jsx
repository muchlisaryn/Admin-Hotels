import { useSelector } from "react-redux";
import { Button, Sidebar, Navbar } from "../../../component";
import "./style.css";
import { useNavigate } from "react-router-dom";

import { colors } from "../../../utils/colors";

export default function HomeKeuangan() {
  const navigate = useNavigate();
  const data = useSelector((state) => state.booking.booking);
  const hotelName = useSelector((state) => state.auth.username);

  const newOrder = data?.filter(
    (item) => item.statusPayment === "Pembayaran Sedang di verifikasi"
  );

  const processOrder = data?.filter(
    (item) => item.statusOrder === "Menunggu Konfirmasi Hotel"
  );

  const successOrder = data?.filter(
    (item) => item.statusPayment === "Berhasil"
  );

  const PaymentFailed = data?.filter(
    (item) => item.currentStatus === "Dibatalkan"
  );

  return (
    <div className="d-flex ">
      <Sidebar />
      <div className="w-100 p-3">
        <Navbar name={hotelName} />

        <div className="mt-3">
          <Button
            color={colors.white}
            backgroundColor={colors.blue}
            onClick={() => navigate("/admin/Hotel/Pemesanan/new-order")}
          >
            <div className="p-5 d-flex justify-content-between ">
              <div>Pemesanan Baru</div>
              <div>{newOrder?.length}</div>
            </div>
          </Button>
        </div>

        <div className="mt-3">
          <Button color={colors.white} backgroundColor={colors.yellow}>
            <div className="p-5 d-flex justify-content-between ">
              <div>Pemesanan Diproses</div>
              <div>{processOrder?.length}</div>
            </div>
          </Button>
        </div>

        <div className="mt-3">
          <Button color={colors.white} backgroundColor={colors.green}>
            <div className="p-5 d-flex justify-content-between ">
              <div>Pemesanan Berhasil</div>
              <div>{successOrder?.length}</div>
            </div>
          </Button>
        </div>

        <div className="mt-3">
          <Button
            color={colors.white}
            backgroundColor={colors.red}
            onClick={() =>
              navigate("/admin/keuangan/pemesanan/Reservasi-ditolak")
            }
          >
            <div className="p-5 d-flex justify-content-between ">
              <div>Pemesanan Gagal</div>
              <div>{PaymentFailed?.length}</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
