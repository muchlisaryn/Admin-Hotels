import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Sidebar } from "../../component";
import { colors } from "../../utils/colors";
import Swal from "sweetalert2";
import "./style.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminKeuangan() {
  const [verifikasi, setVerifikasi] = useState("Belum diverifikasi");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [data, setData] = useState([]);

  const openPayment = (image) => {
    Swal.fire({
      imageUrl: `http://localhost:8000/${image}`,
      imageHeight: 600,
      imageWidth: 500,
      imageAlt: "Image payment",
    });
  };

  console.log(data);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/v1/cms/booking`).then((res) => {
      setData(res.data.data);
    });
  }, []);

  return (
    <div className="d-flex ">
      <Sidebar />
      <div className="w-100 p-3">
        <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
          <div>Hello {`${user?.username}`} </div>
          {user ? (
            <Button title="Logout" color={colors.yellow} />
          ) : (
            <Button title="Login" color={colors.yellow} />
          )}
        </div>

        <div>Pemesanan</div>
        <table className="table-transactions table mt-2">
          <thead>
            <tr>
              <th scope="col">No transactions</th>
              <th scope="col">Customer</th>
              <th scope="col">Date Transactions</th>
              <th scope="col">Hotel Name</th>
              <th scope="col">Status Pembayaran</th>
              <th scope="col">Bukti Pembayaran</th>
              <th scope="col">actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((list) => (
              <tr>
                <th scope="row">#{list.order_id}</th>
                <td>{list.customer.username}</td>
                <td>{list.transaction_time}</td>
                <td>{list.hotelName}</td>

                <td>{verifikasi}</td>
                <td>
                  <button onClick={() => openPayment(list.image_payment.name)}>
                    {" "}
                    Lihat Bukti Pembayaran
                  </button>
                </td>
                <td className="d-flex" style={{ height: 70 }}>
                  <div className="me-2">
                    <Button title="Accept" color={colors.yellow} />
                  </div>
                  <div>
                    <Button title="reject" color={colors.yellow} />
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
