import { useDispatch, useSelector } from "react-redux";
import { Button, Sidebar, HeaderNav, Navbar } from "../../../component";
import { colors } from "../../../utils/colors";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { fetchBooking } from "../../../features/getBookingSlice";
import "./style.css";
import { useNavigate } from "react-router-dom";
import {
  convertDate,
  formatDate,
  lengthOfDay,
} from "../../../utils/formatDate";

export default function HotelOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.booking.booking);
  const hotel = useSelector((state) => state.auth.dataUser);
  const filterHotel = data?.filter((item) => item.hotel_id === hotel);
  const hotelName = useSelector((state) => state.auth.username);
  console.log("ini data booking", data);

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

  return (
    <div className="d-flex ">
      <Sidebar />
      <div className="w-100 p-3">
        <Navbar name={hotelName} />
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
                Pemesanan
              </th>
              <th className="item-table" scope="col">
                Date Order
              </th>
              <th className="item-table" scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {filterHotel
              ?.filter(
                (item) =>
                  item.statusPayment === "Pembayaran Berhasil di validasi"
              )
              .map((list) => (
                <tr>
                  <th className="item-table" scope="row">
                    {list.transaction_time}
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
                    {convertDate(list?.checkIn)} - {convertDate(list?.checkOut)}{" "}
                    (
                    {lengthOfDay(
                      formatDate(list?.checkIn),
                      formatDate(list?.checkOut)
                    )}{" "}
                    Days )
                  </td>
                  <td className="item-table">
                    <Button
                      height={5}
                      onClick={() =>
                        navigate(
                          `/admin/Hotel/Pemesanan/detail-pemesanan/${list._id}`
                        )
                      }
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
