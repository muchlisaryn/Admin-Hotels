import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Sidebar } from "../../component";
import { colors } from "../../utils/colors";
import Swal from "sweetalert2";
import "./style.css";
import { useState } from "react";

export default function AdminHotel() {
  const [verifikasi, setVerifikasi] = useState("Belum diverifikasi");

  const openPayment = (image) => {
    Swal.fire({
      imageUrl: "http://localhost:8000/uploads/57348131-LOGO-_PDIP.svg.png",
      imageHeight: 300,
      imageWidth: 300,
      imageAlt: "A tall image",
    });
  };

  return (
    <div className="d-flex ">
      <Sidebar />
      <div className="w-100 p-3">
        <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
          <div>Hello Admin Muchlis </div>
          <div className="d-flex">
            <Button title="Logout" color={colors.yellow} />
          </div>
        </div>

        <div>Pemesanan</div>
        <table className="table-transactions table mt-2">
          <thead>
            <tr>
              <th scope="col">No transactions</th>
              <th scope="col">Customer</th>
              <th scope="col">Date</th>
              <th scope="col">Room Type</th>
              <th scope="col">Status Pembayaran</th>
              <th scope="col">Bukti Pembayaran</th>
              <th scope="col">actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">x</th>
              <td>xxxxxxxxx </td>
              <td style={{ maxWidth: 82 }}>xxxxxxxxxx</td>
              <td>xxxxxxxx</td>

              <td>{verifikasi}</td>
              <td onClick={openPayment} className="bukti-Pembayaran">
                Lihat Bukti Pembayaran
              </td>
              <td className="d-flex" style={{ height: 70 }}>
                <div className="me-2">
                  <Button title="Accept" color={colors.yellow} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
