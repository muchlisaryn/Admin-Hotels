import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Sidebar } from "../../component";
import { colors } from "../../utils/colors";
import Swal from "sweetalert2";
import "./style.css";
import { useState } from "react";

export default function AdminHotel() {
  const [verifikasi, setVerifikasi] = useState("Belum diverifikasi");

  const openPayment = () => {
    Swal.fire({
      imageUrl: "https://placeholder.pics/svg/300x1500",
      imageHeight: 300,
      imageWidth: 300,
      imageAlt: "A tall image",
    });
  };

  return (
    <div className="d-flex ">
      <Sidebar />
      <div className="w-100 p-3">
        <div className="d-flex justify-content-between border-bottom pb-3">
          <div>Wellcome Admin Budi</div>
          <div className="d-flex">
            <Link to="/user/create-user">
              <Button title="Create User" color={colors.yellow} />
            </Link>
          </div>
        </div>
        <table class="table-transactions table">
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
              <th scope="row">1</th>
              <td>Muchlis Aryana </td>
              <td style={{ maxWidth: 82 }}>
                12 Desember 2022 - 14 Desember 2022 (2 Day)
              </td>
              <td>Triple Queen</td>

              <td>{verifikasi}</td>
              <td onClick={openPayment} className="bukti-Pembayaran">
                Lihat Bukti Pembayaran
              </td>
              <td className="d-flex" style={{ height: 70 }}>
                <div className="me-2">
                  <Link to="/user/edit-user/:id">
                    <Button title="Accept" color={colors.yellow} />
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
