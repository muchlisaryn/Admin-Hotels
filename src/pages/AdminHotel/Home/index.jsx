import { useSelector } from "react-redux";
import { Button, Sidebar, Navbar } from "../../../component";
import "./style.css";
import { useNavigate } from "react-router-dom";

import { colors } from "../../../utils/colors";

export default function HomeHotel() {
  const navigate = useNavigate();
  const data = useSelector((state) => state.booking.booking);
  const hotel = useSelector((state) => state.auth.dataUser);
  const hotelName = useSelector((state) => state.auth.username);
  const filterHotel = data?.filter((item) => item.hotel_id === hotel);

  const PemesananBaru = filterHotel?.filter(
    (data) => data?.statusPayment === "Pembayaran Berhasil di validasi"
  );

  const trasactionSuccess = filterHotel?.filter(
    (data) => data?.statusOrder === "Reservasi diterima"
  );

  const transactionFailed = filterHotel?.filter(
    (data) =>
      data?.statusOrder === "Dibatalkan sistem, Kerena kamar tidak tersedia"
  );

  return (
    <div className="d-flex ">
      <Sidebar />
      <div className="w-100 p-3">
        <Navbar name={hotelName} />

        <div className="mt-4">
          <Button
            color={colors.white}
            backgroundColor={colors.blue}
            onClick={() => navigate("/admin/Hotel/Pemesanan/new-order")}
          >
            <div className="p-5 d-flex justify-content-between ">
              <div>Pemesanan Baru</div>
              <div>{PemesananBaru?.length}</div>
            </div>
          </Button>
        </div>

        <div className="mt-4">
          <Button
            color={colors.white}
            backgroundColor={colors.green}
            onClick={() => navigate("/admin/Hotel/Pemesanan/success-order")}
          >
            <div className="p-5 d-flex justify-content-between ">
              <div>Pemesanan Berhasil</div>
              <div>{trasactionSuccess?.length}</div>
            </div>
          </Button>
        </div>

        <div className="mt-4">
          <Button
            color={colors.white}
            backgroundColor={colors.red}
            onClick={() => navigate("/admin/Hotel/Pemesanan/failed-order")}
          >
            <div className="p-5 d-flex justify-content-between ">
              <div>Pemesanan Gagal</div>
              <div>{transactionFailed?.length}</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
