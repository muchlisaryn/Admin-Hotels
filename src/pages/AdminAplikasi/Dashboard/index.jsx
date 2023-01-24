import { Navbar, Sidebar } from "../../../component";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../features/getUserSlice";
import { fetchBooking } from "../../../features/getBookingSlice";
import { useEffect, useState } from "react";
import { formatIDR } from "../../../utils/formatIDR";

export default function AdminAplikasiDashboard() {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.username);
  const user = useSelector((state) => state.user.users);
  const booking = useSelector((state) => state.booking.booking);
  const [totalPayment, setTotalPayment] = useState();

  console.log(totalPayment);
  const successOrder = booking?.filter(
    (item) => item.statusOrder === "Reservasi diterima"
  );

  useEffect(() => {
    const total = () => {
      let temp = 0;
      successOrder.forEach((data) => {
        temp += data.Total_payment;
      });
      setTotalPayment(temp);
    };
    total();
  }, []);

  useEffect(() => {
    dispatch(fetchUsers(`http://localhost:8000/api/v1/cms/users`));
    dispatch(fetchBooking());
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="w-100 p-3">
        <Navbar name={name} />
        <div className="d-flex justify-content-between mt-4">
          <div className="border rounded p-5">
            <div>
              <div>TOTAL USER</div>
              <div>{user?.length}</div>
            </div>
          </div>
          <div className="border rounded p-5">
            <div>
              <div>TOTAL PEMASUKAN</div>
              <div>{formatIDR.format(totalPayment)}</div>
            </div>
          </div>

          <div className="border rounded p-5">
            <div>
              <div>TOTAL USER</div>
              <div>1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
