import { useDispatch, useSelector } from "react-redux";
import { Button, Sidebar, HeaderNav, Navbar } from "../../../../component";
import { useEffect } from "react";
import { fetchBooking } from "../../../../features/getBookingSlice";
import "./style.css";
import { useNavigate } from "react-router-dom";
import {
  convertDate,
  formatDate,
  lengthOfDay,
} from "../../../../utils/formatDate";
import { formatIDR } from "../../../../utils/formatIDR";

export default function FailedOrderHotel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.booking.booking);
  const hotel = useSelector((state) => state.auth.dataUser);
  const filterHotel = data?.filter((item) => item.hotel_id === hotel);
  const hotelName = useSelector((state) => state.auth.username);

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

  useEffect(() => {
    dispatch(fetchBooking());
  }, []);

  return (
    <div className="d-flex ">
      <Sidebar />
      <div className="w-100 p-3">
        <Navbar name={hotelName} />
        <HeaderNav
          orderNew={PemesananBaru?.length}
          success={trasactionSuccess?.length}
          failed={transactionFailed?.length}
        />
        <table className="table-transactions table mt-2">
          <thead>
            <tr>
              <th className="item-table" scope="col">
                No Order
              </th>
              <th className="item-table" scope="col">
                Customer
              </th>
              <th className="item-table" scope="col">
                Pemesanan
              </th>
              <th className="item-table" scope="col">
                Date Order
              </th>

              <th className="item-table" scope="col">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {transactionFailed?.map((list) => (
              <tr>
                <th className="item-table" scope="row">
                  #{list?.order_id}
                </th>
                <td className="item-table">
                  <div className="d-flex">
                    <div></div>
                    <div>{list.customer.username}</div>
                  </div>
                </td>
                <td className="item-table">
                  {list?.name_room} x {list?.countRoom}
                </td>

                <td className="item-table ">
                  {convertDate(list?.checkIn)} - {convertDate(list?.checkOut)} (
                  {lengthOfDay(
                    formatDate(list?.checkIn),
                    formatDate(list?.checkOut)
                  )}{" "}
                  Days )
                </td>

                <td className="item-table">{list?.statusOrder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
