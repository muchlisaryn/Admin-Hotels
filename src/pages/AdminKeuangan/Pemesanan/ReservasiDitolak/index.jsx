import { useDispatch, useSelector } from "react-redux";

import { Button, Sidebar, HeaderNav, Navbar } from "../../../../component";
import { colors } from "../../../../utils/colors";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import axios from "axios";
import { fetchBooking } from "../../../../features/getBookingSlice";
import "./style.css";

export default function ReservasiReject() {
  const dispatch = useDispatch();
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

  const accept = async (id) => {
    Swal.fire({
      title: "Are you sure accept payment?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Accept !",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`http://localhost:8000/api/v1/cms/booking/${id}`, {
          statusPayment: "Pembayaran Berhasil di validasi",
          statusOrder: "Menunggu Konfirmasi Hotel",
        });
        window.location.reload(false);
      }
    });
  };

  const reject = async (id) => {
    Swal.fire({
      title: "Are you sure reject payment?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject !",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`http://localhost:8000/api/v1/cms/booking/${id}`, {
          currentStatus: "Dibatalkan",
          statusPayment: "Pembayaran ditolak",
        });
        window.location.reload(false);
      }
    });
  };

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
        <div>Pemesanan</div>
        <table className="table-transactions table mt-2">
          <thead>
            <tr>
              <th className="item-table" scope="col">
                Date Transactions
              </th>
              <th className="item-table" scope="col">
                Customer
              </th>
              <th className="item-table" scope="col">
                Hotel Name
              </th>
              <th className="item-table" scope="col">
                Status Pemesanan
              </th>
              <th className="item-table" scope="col">
                Bukti Pembayaran
              </th>
              <th className="item-table" scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {reservasiFailed?.map((list) => (
              <tr>
                <th className="item-table" scope="row">
                  {list.transaction_time}
                </th>
                <td className="item-table">{list.customer.username}</td>
                <td className="item-table">{list?.hotel_name}</td>
                <td className="item-table">{list?.statusOrder}</td>
                <td className="item-table bukti-Pembayaran">
                  <div onClick={() => openPayment(list)}>
                    Lihat Bukti Pembayaran
                  </div>
                </td>
                <td className="d-flex" style={{ height: 70 }}>
                  <div className="me-2">
                    <Button
                      title="Kembalikan Dana"
                      fontSize={12}
                      color={colors.white}
                      backgroundColor={colors.blue}
                      onClick={() => accept(list._id)}
                    />
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
