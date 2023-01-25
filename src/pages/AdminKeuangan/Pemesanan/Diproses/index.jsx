import { useDispatch, useSelector } from "react-redux";
import { Button, Sidebar, HeaderNav, Navbar } from "../../../../component";
import { colors } from "../../../../utils/colors";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { fetchBooking } from "../../../../features/getBookingSlice";
import "./style.css";

export default function OrderProses() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const data = useSelector((state) => state.booking.booking);

  const orderNew = data?.filter(
    (item) => item.statusPayment === "Pembayaran Sedang di verifikasi"
  );

  const reservasiFailed = data?.filter(
    (item) =>
      item.statusOrder === "Dibatalkan sistem, Kerena kamar tidak tersedia"
  );

  const processOrder = data?.filter(
    (item) => item.statusOrder === "Menunggu Konfirmasi Hotel"
  );

  const PaymentFailed = data?.filter(
    (item) => item.statusPayment === "Pembayaran ditolak"
  );

  const successOrder = data?.filter(
    (item) => item.statusOrder === "Reservasi diterima"
  );

  console.log(processOrder);

  const openPayment = (order) => {
    Swal.fire({
      text: `${order?.customer?.name_bank} : ${order?.customer?.no_rekening} a/n ${order?.customer?.nama_rekening}`,
      imageUrl: `http://localhost:8000/${order?.image_payment?.name}`,
      imageHeight: 500,
      imageWidth: 250,
      imageAlt: "Image payment",
    });
  };

  useEffect(() => {
    dispatch(fetchBooking());
  }, []);

  return (
    <div className="d-flex ">
      <Sidebar />
      <div className="w-100 p-3">
        <Navbar />
        <div>
          <HeaderNav
            OrderFailed={reservasiFailed?.length}
            process={processOrder?.length}
            orderNew={orderNew?.length}
            payFailed={PaymentFailed?.length}
            success={successOrder?.length}
          />
        </div>
        <table className="table-transactions table mt-2">
          <thead>
            <tr>
              <th className="item-table" scope="col">
                No transactions
              </th>
              <th className="item-table" scope="col">
                Customer
              </th>
              <th className="item-table" scope="col">
                Date Transactions
              </th>
              <th className="item-table" scope="col">
                Hotel Name
              </th>
              <th className="item-table" scope="col">
                Status Pemesanan
              </th>
              <th className="item-table" scope="col">
                Status Pembayaran
              </th>
              <th className="item-table" scope="col">
                Bukti Pembayaran
              </th>
            </tr>
          </thead>
          <tbody>
            {processOrder?.map((list) => (
              <tr>
                <th className="item-table" scope="row">
                  #{list.order_id}
                </th>
                <td className="item-table">{list.customer.username}</td>
                <td className="item-table">{list.transaction_time}</td>
                <td className="item-table">{list?.hotel_name}</td>
                <td className="item-table">{list?.statusOrder}</td>
                <td className="item-table">{list.statusPayment}</td>
                <td className="item-table bukti-Pembayaran">
                  <div onClick={() => openPayment(list)}>
                    Lihat Bukti Pembayaran
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
