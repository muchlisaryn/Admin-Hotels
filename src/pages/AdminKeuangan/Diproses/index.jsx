import { useDispatch, useSelector } from "react-redux";
import { Button, Sidebar, HeaderNav } from "../../../component";
import { colors } from "../../../utils/colors";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { fetchBooking } from "../../../features/getBookingSlice";
import "./style.css";

export default function OrderProses() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const data = useSelector((state) => state.booking.booking);
  const processOrder = data?.filter(
    (item) => item.statusOrder === "Menunggu Konfirmasi Hotel"
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

  return (
    <div className="d-flex ">
      <Sidebar />
      <div className="w-100 p-3">
        <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
          <div>Hello {`${user?.username}`} </div>
          <div>
            {user ? (
              <Button
                title="Logout"
                color={colors.white}
                backgroundColor={colors.blue}
              />
            ) : (
              <Button
                title="Login"
                color={colors.white}
                backgroundColor={colors.blue}
              />
            )}
          </div>
        </div>

        <div>
          <HeaderNav />
        </div>

        <div>Pemesanan</div>
        <table className="table-transactions table mt-2">
          <thead>
            <tr>
              <th className="item-table" scope="col">
                No transactions
              </th>
              <th className="item-table" scope="col">
                Customer
              </th>
              <th className="item-table" scope="col">
                Date Transactions
              </th>
              <th className="item-table" scope="col">
                Hotel Name
              </th>
              <th className="item-table" scope="col">
                Status Pemesanan
              </th>
              <th className="item-table" scope="col">
                Status Pembayaran
              </th>
              <th className="item-table" scope="col">
                Bukti Pembayaran
              </th>
            </tr>
          </thead>
          <tbody>
            {processOrder?.map((list) => (
              <tr>
                <th className="item-table" scope="row">
                  #{list.order_id}
                </th>
                <td className="item-table">{list.customer.username}</td>
                <td className="item-table">{list.transaction_time}</td>
                <td className="item-table">{list?.hotel_name}</td>
                <td className="item-table">{list?.statusOrder}</td>
                <td className="item-table">{list.statusPayment}</td>
                <td className="item-table bukti-Pembayaran">
                  <div onClick={() => openPayment(list.image_payment.name)}>
                    Lihat Bukti Pembayaran
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
