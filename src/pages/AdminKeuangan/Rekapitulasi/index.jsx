import { useSelector } from "react-redux";
import { Sidebar, Navbar } from "../../../component";
import { useState, useEffect } from "react";
import { colors } from "../../../utils/colors";

import { formatIDR } from "../../../utils/formatIDR";

export default function RekapitulasiKeuangan() {
  const data = useSelector((state) => state.booking.booking);

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
        temp += data.Total_payment;
      });
      setBerhasil(temp);
    };
    const PayNew = () => {
      let temp = 0;
      newOrder.forEach((data) => {
        temp += data.Total_payment;
      });
      setOrderBaru(temp);
    };
    const Process = () => {
      let temp = 0;
      processOrder.forEach((data) => {
        temp += data.Total_payment;
      });
      setProcess(temp);
    };
    PaySuccess();
    PayNew();
    Process();
  }, [setOrderBaru, setBerhasil]);

  console.log("ini order berhasil", successOrder);

  return (
    <div className="d-flex ">
      <Sidebar />
      <div className="w-100 p-3">
        <Navbar />
        <div className="d-flex mt-3 ">
          <div className="p-5 border rounded me-2">
            <div>Pemesanan Baru</div>
            <div className="fw-bold">{newOrder?.length}</div>
            <div className="d-flex">
              <div> Potensi</div>
              <div className="fw-bold text-success">
                +{formatIDR.format(orderBaru)}
              </div>
            </div>
          </div>
          <div className="p-5 border rounded me-2">
            <div>Pemesanan Diproses</div>
            <div className="fw-bold">{processOrder?.length}</div>
            <div className="d-flex">
              <div> Potensi</div>
              <div className="fw-bold text-success">
                +{formatIDR.format(process)}
              </div>
            </div>
          </div>
          <div className="p-5 border rounded">
            <div>Pemesanan Berhasil </div>
            <div className="fw-bold">{successOrder?.length}</div>
            <div className="fw-bold " style={{ color: colors.blue }}>
              {formatIDR.format(berhasil)}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Order</th>
                <th scope="col">Tanggal Transaksi</th>
                <th scope="col">Hotel</th>
                <th scope="col">Harga</th>
              </tr>
            </thead>
            <tbody>
              {successOrder?.map((list) => (
                <tr>
                  <th scope="row">#{list?.order_id}</th>
                  <td>{list?.transaction_time}</td>
                  <td>{list?.hotel_name}</td>
                  <td>{formatIDR.format(list?.Total_payment)}</td>
                </tr>
              ))}
              <tr>
                <td colspan="3">Total Pemasukan</td>
                <td className="fw-bold">{formatIDR.format(berhasil)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
