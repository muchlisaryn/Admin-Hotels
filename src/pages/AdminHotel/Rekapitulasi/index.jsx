import { useSelector } from "react-redux";
import { Sidebar, Navbar, Button } from "../../../component";
import { useState, useEffect } from "react";
import { colors } from "../../../utils/colors";

import { formatIDR } from "../../../utils/formatIDR";
import { Link } from "react-router-dom";
import { convertDate, lengthOfDay } from "../../../utils/formatDate";
import { formatDate } from "../../../utils/formatDate";

export default function RekapitulasiOrderHotel() {
  const data = useSelector((state) => state.booking.booking);
  const hotel = useSelector((state) => state.auth.dataUser);
  const filterHotel = data?.filter((item) => item.hotel_id === hotel);
  const fee = useSelector((state) => state.fee.fee);

  const processOrder = filterHotel?.filter(
    (item) => item.statusOrder === "Menunggu Konfirmasi Hotel"
  );

  const successOrder = filterHotel?.filter(
    (item) => item.statusOrder === "Reservasi diterima"
  );

  const [berhasil, setBerhasil] = useState();
  const [process, setProcess] = useState();

  useEffect(() => {
    const PaySuccess = () => {
      let temp = 0;
      successOrder.forEach((data) => {
        temp += data?.charge_pay;
      });
      setBerhasil(temp);
    };
    const PemesananBaru = () => {
      let temp = 0;
      processOrder.forEach((data) => {
        temp += data?.charge_pay;
      });
      setProcess(temp);
    };
    PemesananBaru();
    PaySuccess();
  }, []);

  console.log("ini order berhasil", successOrder);

  return (
    <div className="d-flex ">
      <Sidebar />
      <div className="w-100 p-3">
        <Navbar />
        <div className="d-flex mt-3">
          <div className="p-5 border rounded w-25 d-flex justify-content-center">
            <div>
              <div className="text-center">Order Baru</div>
              <div className="text-center">{processOrder?.length}</div>

              <div>
                Potensi <span>+ {formatIDR.format(process)}</span>
              </div>
            </div>
          </div>
          <div className="p-5 border rounded w-25 d-flex justify-content-center ms-3">
            <div>
              <div className="text-center">Order Berhasil</div>
              <div className="text-center">{successOrder?.length}</div>
              <div>{formatIDR.format(berhasil)}</div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Order</th>
                <th scope="col">Kamar</th>
                <th scope="col">Booking</th>
                <th scope="col">Payment</th>
                <th scope="col">Pendapatan Bersih</th>
              </tr>
            </thead>
            <tbody>
              {successOrder?.map((list) => (
                <tr>
                  <th scope="row" className="d-flex">
                    <div>#{list?.order_id}</div>
                    <div className="ms-3">
                      {" "}
                      <Link
                        to={`/admin/Hotel/Rekapitulasi/detail-rekapitulasi/${list._id}`}
                      >
                        <Button
                          title="detail"
                          color={colors.white}
                          backgroundColor={colors.blue}
                        />
                      </Link>
                    </div>{" "}
                  </th>
                  <td className="w-25">{list?.name_room}</td>
                  <td>
                    {convertDate(list?.checkIn)} - {convertDate(list?.checkOut)}{" "}
                    (
                    {lengthOfDay(
                      formatDate(list?.checkIn),
                      formatDate(list?.checkOut)
                    )}{" "}
                    Days )
                  </td>
                  <td>
                    <s>{formatIDR.format(list?.Total_payment)}</s>{" "}
                    <span className="text-danger"> Fee {fee?.amount}%</span>
                  </td>
                  <td>{formatIDR.format(list?.charge_pay)}</td>
                </tr>
              ))}
              <tr>
                <td colspan="4">Total Pemasukan</td>
                <td className="fw-bold">{formatIDR.format(berhasil)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
