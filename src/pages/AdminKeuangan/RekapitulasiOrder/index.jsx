import { useSelector } from "react-redux";
import { Sidebar, Navbar, Button } from "../../../component";
import { useState, useEffect } from "react";
import { colors } from "../../../utils/colors";

import { formatIDR } from "../../../utils/formatIDR";
import { Link } from "react-router-dom";

export default function RekapitulasiOrder() {
  const data = useSelector((state) => state.booking.booking);
  const fee = useSelector((state) => state.fee.fee);

  const newOrder = data?.filter(
    (item) => item.statusPayment === "Pembayaran Sedang di verifikasi"
  );

  const processOrder = data?.filter(
    (item) => item.statusOrder === "Menunggu Konfirmasi Hotel"
  );

  const successOrder = data?.filter(
    (item) => item.statusOrder === "Reservasi diterima"
  );
  const [orderBaru, setOrderBaru] = useState();
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
    PaySuccess();
  }, []);

  console.log("ini order berhasil", successOrder);

  return (
    <div className="d-flex ">
      <Sidebar />
      <div className="w-100 p-3">
        <Navbar />

        <div className="mt-4">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Order</th>
                <th scope="col">Tanggal Transaksi</th>
                <th scope="col">Hotel</th>
                <th scope="col">Price</th>
                <th scope="col">Gross Income</th>
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
                        to={`/admin/keuangan/rekapitulasi/detail-rekapitulasi/${list._id}`}
                      >
                        <Button
                          title="detail"
                          color={colors.white}
                          backgroundColor={colors.blue}
                        />
                      </Link>
                    </div>{" "}
                  </th>
                  <td>{list?.transaction_time}</td>
                  <td>{list?.hotel_name}</td>
                  <td>
                    <s>{formatIDR.format(list?.Total_payment)}</s> {fee?.amount}
                    %
                  </td>
                  <td>{formatIDR.format(list?.charge_pay)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
