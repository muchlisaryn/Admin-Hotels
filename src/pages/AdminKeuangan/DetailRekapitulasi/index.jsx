import { useSelector } from "react-redux";
import { Sidebar, Navbar, Button } from "../../../component";
import { useState, useEffect } from "react";
import { colors } from "../../../utils/colors";
import axios from "axios";
import { formatIDR } from "../../../utils/formatIDR";
import { useParams } from "react-router-dom";
import {
  convertDate,
  formatDate,
  lengthOfDay,
} from "../../../utils/formatDate";

export default function DetailRekapitulasi() {
  const { id } = useParams();
  const [data, setData] = useState();
  const fee = useSelector((state) => state.fee.fee);

  console.log("detail data", data);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/cms/booking/${id}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="d-flex ">
      <Sidebar />
      <div className="w-100 p-3">
        <Navbar />

        <div>
          <div className="mt-3 d-flex justify-content-between">
            <div>
              <div className="d-flex">
                <div style={{ width: 140 }}>Nama Hotel</div>
                <div>{data?.hotel_name}</div>
              </div>
              <div className="d-flex">
                <div style={{ width: 140 }}>Alamat Hotel</div>
                <div>{data?.address_hotel}</div>
              </div>
              <div className="d-flex">
                <div style={{ width: 140 }}>Transactions Time</div>
                <div>{data?.transaction_time}</div>
              </div>
            </div>
            <div>
              <div>Kode Booking</div>
              <div>{data?.codeBooking}</div>
            </div>
          </div>
          <hr />

          <div className="d-flex justify-content-between">
            <div>
              <div className="mt-3">
                <div className="fw-bold">Data Tamu</div>
                <div className="mt-2">
                  <div className="d-flex">
                    <div style={{ width: 200 }}>Nama Tamu</div>
                    <div>{data?.guest?.name}</div>
                  </div>
                  <div className="d-flex">
                    <div style={{ width: 200 }}>Email</div>
                    <div>{data?.guest?.email}</div>
                  </div>
                  <div className="d-flex">
                    <div style={{ width: 200 }}>Telephone</div>
                    <div>{data?.guest?.telephone}</div>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <div className="fw-bold">Detail Order</div>
                <div className="mt-2">
                  <div className="d-flex">
                    <div style={{ width: 200 }}>Checkin - CheckOut</div>
                    <div>
                      {convertDate(data?.checkIn)} -{" "}
                      {convertDate(data?.checkOut)} (
                      {lengthOfDay(data?.checkIn, data?.checkOut)} days)
                    </div>
                  </div>

                  <div className="d-flex">
                    <div style={{ width: 200 }}>Jumlah tamu</div>
                    <div>{data?.countPerson} Guest</div>
                  </div>
                  <div className="d-flex">
                    <div style={{ width: 200 }}>Type Room</div>
                    <div>{data?.countRoom} Rooms</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 border rounded">
              <div>Rincian Keuangan</div>
              <div className="d-flex mt-2">
                <div style={{ width: 200 }}>Pembayaran</div>
                <div>{data?.Total_payment}</div>
              </div>
              <div className="d-flex mt-2">
                <div style={{ width: 190 }}>Fee App</div>
                <div>- {data?.charge_pay}</div>
              </div>
              <hr />
              <div className="d-flex mt-2">
                <div style={{ width: 200 }}>Total</div>
                <div>{data?.charge_pay}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
