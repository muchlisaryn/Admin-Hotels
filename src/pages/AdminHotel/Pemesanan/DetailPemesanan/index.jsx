import { useDispatch, useSelector } from "react-redux";
import { Button, Sidebar, HeaderNav, Navbar } from "../../../../component";
import { convertDate } from "../../../../utils/formatDate";
import Swal from "sweetalert2";
import { useEffect } from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { colors } from "../../../../utils/colors";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function DetailPemesanan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotelName = useSelector((state) => state.auth.username);
  const [detail, setDetail] = useState({});
  console.log("ini data booking", detail);

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
    axios
      .get(`http://localhost:8000/api/v1/cms/booking/${id}`)
      .then((res) => {
        setDetail(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="d-flex ">
      <Sidebar />
      <div className="w-100 p-3">
        <Navbar name={hotelName} />
        <div style={{ width: 100 }} className="mt-2 mb-2">
          <Button
            backgroundColor={colors.blue}
            color={colors.white}
            height={5}
            onClick={() => navigate("/admin/Hotel/Pemesanan")}
          >
            <AiOutlineArrowLeft />
            Back
          </Button>
        </div>
        <div>Detail Pemesanan #{detail.order_id}</div>
        <div>Tanggal Transaksi : {detail?.transaction_time}</div>
        <div>Status Pembayaran : {detail?.statusPayment}</div>
        <div className="mt-2 d-flex justify-content-between">
          <div className="border rounded p-2 w-50 me-2">
            <div>Data Tamu</div>
            <div className="mt-2">
              <div className="d-flex">
                <div style={{ width: 120 }}>Nama</div>
                <div>: {detail?.guest?.name}</div>
              </div>
              <div className="d-flex">
                <div style={{ width: 120 }}>Email</div>
                <div>: {detail?.guest?.email}</div>
              </div>
              <div className="d-flex">
                <div style={{ width: 120 }}>telephone</div>
                <div>: {detail?.guest?.telephone}</div>
              </div>
            </div>
          </div>
          <div className="border rounded p-2 w-50 ms-2">
            <div>Data Pemesanan</div>
            <div className="mt-2">
              <div className="d-flex">
                <div style={{ width: 120 }}>Type Room</div>
                <div>
                  : {detail?.name_room} x {detail?.countRoom}
                </div>
              </div>
              <div className="d-flex">
                <div style={{ width: 120 }}>Check-In</div>
                <div>: {convertDate(detail?.checkIn)}</div>
              </div>
              <div className="d-flex">
                <div style={{ width: 120 }}>Check - Out</div>
                <div>: {convertDate(detail?.checkOut)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex mt-2">
          <div className="me-2">
            <Button
              height={6}
              backgroundColor={colors.green}
              color={colors.white}
            >
              Accept
            </Button>
          </div>
          <div>
            <Button
              height={6}
              backgroundColor={colors.red}
              color={colors.white}
            >
              Reject
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
