import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar, Navbar } from "../../../component";
import { fetchBooking } from "../../../features/getBookingSlice";
import "./style.css";
import { convertDate } from "../../../utils/formatDate";

export default function AdminAplikasiRekapitulasi() {
  const loading = useSelector((state) => state.user.pending);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.booking.booking);

  useEffect(() => {
    dispatch(fetchBooking());
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="w-100 p-3">
        <Navbar />
        <table class="table tab-header">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">transaction time</th>
              <th scope="col">Transactions</th>
              <th scope="col">Booking Date</th>
              <th scope="col">Amount</th>
              <th scope="col">Status Order</th>
            </tr>
          </thead>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <tbody>
              {data?.map((item, index) => (
                <tr
                  style={
                    item?.statusOrder
                      ? { backgroundColor: "#ffb4b4" }
                      : { backgroundColor: "#b4ffc4" }
                  }
                >
                  <th scope="row">{index + 1}</th>
                  <td className="tab-item">{item?.transaction_time}</td>
                  <td className="tab-item">
                    <div className="d-flex">
                      <div className="me-2">#{item?.order_id}</div>
                      <div
                        className=" d-inline-block text-truncate"
                        style={{ maxWidth: 160 }}
                      >
                        {item?.hotelName}
                      </div>
                    </div>
                    <div>
                      <image />
                      <div>@{item?.customer?.username}</div>
                    </div>
                  </td>
                  <td className="tab-item">
                    {convertDate(item?.checkIn)} - {convertDate(item?.checkOut)}
                  </td>
                  <td className="tab-item">{item?.Total_payment}</td>
                  <td className="tab-item">
                    {item?.statusOrder ? `NonActive` : `Active`}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
