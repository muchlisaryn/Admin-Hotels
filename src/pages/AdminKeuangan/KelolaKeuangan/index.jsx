import { useDispatch, useSelector } from "react-redux";

import { Button, Sidebar, HeaderNav, Navbar } from "../../../component";
import { colors } from "../../../utils/colors";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import axios from "axios";
import { fetchBooking } from "../../../features/getBookingSlice";
import "./style.css";
import RekeningBank from "./parts/Rekening";
import Fee from "./parts/Fee";

export default function KelolaKeuangan() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const data = useSelector((state) => state.booking.booking);
  const newOrder = data?.filter(
    (item) => item.statusPayment === "Pembayaran Sedang di verifikasi"
  );

  const openPayment = (image) => {
    Swal.fire({
      text: `Nomor Rekening : 0213213214 a/n Muchlis`,
      imageUrl: `http://localhost:8000/${image}`,
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
        <div className="border rounded mt-2 p-2">
          <RekeningBank />
        </div>
        <div className="border rounded mt-2 p-2">
          <Fee />
        </div>
      </div>
    </div>
  );
}
