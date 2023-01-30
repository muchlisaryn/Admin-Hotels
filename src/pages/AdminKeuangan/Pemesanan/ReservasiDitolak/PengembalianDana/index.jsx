import { useDispatch, useSelector } from "react-redux";
import { Sidebar, Navbar, Button } from "../../../../../component";
import { useState, useEffect } from "react";
import { colors } from "../../../../../utils/colors";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { convertDate, lengthOfDay } from "../../../../../utils/formatDate";
import { formatIDR } from "../../../../../utils/formatIDR";

export default function PengembalianDana() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();
  const [photo, setPhoto] = useState("");

  console.log("data", data);

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

  const openPayment = () => {
    Swal.fire({
      text: `${data?.customer?.name_bank} : ${data?.customer?.no_rekening} a/n ${data?.customer?.nama_rekening}`,
      imageUrl: `http://localhost:8000/${data?.image_payment?.name}`,
      imageHeight: 500,
      imageWidth: 250,
      imageAlt: "Image payment",
    });
  };

  const uploadImage = async (file) => {
    let formData = new FormData();
    formData.append("payment", file);
    const res = await axios.post(
      "http://localhost:8000/api/v1/cms/images/payment",
      formData,
      true
    );
    return res;
  };

  const uploadRefund = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      `http://localhost:8000/api/v1/cms/booking/${id}`,
      {
        image_refund: photo,
        statusPayment: "Dana sudah di kembalikan",
      }
    );
    if (res.data.data) {
      alert("dana berhasil dikembalikan");
      navigate("/admin/keuangan/pemesanan/Reservasi-ditolak");
      console.log("berhasil refund");
    } else {
      console.log(res);
    }
  };

  const handleChange = async (e) => {
    console.log(e.target.files[0]);
    if (e.target.name === "payment") {
      if (
        e?.target?.files[0].type === "image/jpg" ||
        e?.target?.files[0].type === "image/png" ||
        e?.target?.files[0].type === "image/jpeg"
      ) {
        var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

        if (size > 2) {
          alert("please select image size less than 3 MB");
        } else {
          const res = await uploadImage(e.target.files[0]);
          setPhoto(res.data.data._id);
        }
      } else {
        alert("Please input Image format PNG | JPG | JPEG");
      }
    }
  };

  return (
    <div className="d-flex ">
      <div className="position-fixed col-2">
        <Sidebar />
      </div>
      <div className="w-100 p-2 col offset-2">
        <div>
          <Navbar />
        </div>
        <div className="mt-2 w-25">
          <Button
            title="Back"
            onClick={() =>
              navigate("/admin/keuangan/pemesanan/Reservasi-ditolak")
            }
            color={colors.white}
            backgroundColor={colors.blue}
          />
        </div>
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
            </div>
            <div>
              <div>Status pemesanan</div>
              <div className="text-danger">{data?.statusOrder}</div>
            </div>
          </div>
          <hr />

          <div className="d-flex justify-content-between">
            <div>
              <div>
                <div className="fw-bold">Data Pemesan</div>
                <div className="mt-2">
                  <div className="d-flex">
                    <div style={{ width: 200 }}>Username</div>
                    <div>{data?.customer?.username}</div>
                  </div>
                  <div className="d-flex">
                    <div style={{ width: 200 }}>Nomor Telephone</div>
                    <div>{data?.customer?.telephone}</div>
                  </div>
                  <div className="d-flex">
                    <div style={{ width: 200 }}>Email</div>
                    <div>{data?.customer?.email}</div>
                  </div>
                  <div className="d-flex">
                    <div style={{ width: 200 }}>No Rekening</div>
                    <div>
                      {data?.customer?.name_bank} ({data?.customer?.no_rekening}
                      )
                    </div>
                  </div>
                  <div className="d-flex">
                    <div style={{ width: 200 }}>Total Pembayaran</div>
                    <div>{formatIDR.format(data?.charge_pay)}</div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
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

              <div className="mt-4">
                <div className="fw-bold">Detail Order</div>
                <div className="mt-2">
                  <div className="d-flex">
                    <div style={{ width: 200 }}>Nama Hotel</div>
                    <div>{data?.hotel_name}</div>
                  </div>
                  <div className="d-flex">
                    <div style={{ width: 200 }}>Type Kamar</div>
                    <div>{data?.name_room}</div>
                  </div>
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
              <div>
                <div className="mb-4">Ringkasan Pengembalian Dana</div>
                <div className="d-flex">
                  <div style={{ width: 300 }}>Total Pembayaran</div>
                  <div>{formatIDR.format(data?.Total_payment)}</div>
                </div>
              </div>
              <div>
                <div className="d-flex">
                  <div style={{ width: 300 }}>Bukti Pembayaran Pembayaran</div>
                  <div onClick={openPayment}>Klik disini</div>
                </div>
              </div>

              {data?.statusPayment === "Dana sudah di kembalikan" ? (
                <>
                  <div className="mt-5">Dana Sudah Berhasil dikembalikan</div>
                  <div>
                    <img
                      src={`http://localhost:8000/${data?.image_refund?.name}`}
                      style={{ width: 400 }}
                    />
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div>
                    <div className="d-flex mt-5">
                      <div style={{ width: 300 }}>Upload Pengembalian Dana</div>
                      <div style={{ width: 200 }}>
                        <input
                          type="file"
                          label={"payment"}
                          name="payment"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  {photo?.length > 2 ? (
                    <div className="mt-5">
                      <Button
                        onClick={uploadRefund}
                        title="Kirim Pengembalian dana"
                        height={10}
                        color={colors.blue}
                        backgroundColor={colors.yellow}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
