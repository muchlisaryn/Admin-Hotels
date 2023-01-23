import { useState } from "react";
import { Sidebar, Navbar, Button } from "../../../../component";
import { colors } from "../../../../utils/colors";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default function EditRekening() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [bank, setBank] = useState("BCA");
  const [nama, setName] = useState("");
  const [noRekening, setNoRekening] = useState("");

  console.log("bank", bank);
  console.log("nama", nama);
  console.log("norek", noRekening);

  const role = [
    {
      name: "BCA",
      value: "BCA",
    },
    {
      name: "BNI",
      value: "BNI",
    },
    {
      name: "BRI",
      value: "BRI",
    },
  ];

  const clear = () => {
    setName("");
    setNoRekening("");
  };

  const edit = () => {
    axios
      .put(`http://localhost:8000/api/v1/cms/rekening/${id}`, {
        bank,
        nomor: noRekening,
        pemilik: nama,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/admin/keuangan/Kelola-keuangan");
  };

  return (
    <div className="d-flex ">
      <Sidebar />
      <div className="w-100 p-3">
        <Navbar />
        <div className="mt-3" style={{ width: 100 }}>
          <Button
            backgroundColor={colors.blue}
            color={colors.white}
            height={8}
            onClick={() => navigate("/admin/keuangan/Kelola-keuangan")}
          >
            <AiOutlineArrowLeft />
            Back
          </Button>
        </div>
        <div className="border rounded p-2 mt-3">
          <div>
            <div className="d-flex">
              <div style={{ width: 150 }}>Nama Bank</div>
              <select
                name="role"
                id="role"
                onChange={(e) => setBank(e.target.value)}
              >
                {role?.map((item) => (
                  <option value={item.value}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="d-flex mt-2">
            <div style={{ width: 150 }}>Pemilik Rekening</div>
            <input
              type="text"
              value={nama}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="d-flex mt-2">
            <div style={{ width: 150 }}>Nomor Rekening</div>
            <input
              type="text"
              value={noRekening}
              onChange={(e) => setNoRekening(e.target.value)}
            />
          </div>
          <div className="d-flex mt-4">
            <div className="me-2">
              <Button
                color={colors.white}
                backgroundColor={colors.green}
                height={5}
                onClick={edit}
              >
                EDIT
              </Button>
            </div>
            <div>
              <Button
                color={colors.blue}
                backgroundColor={colors.yellow}
                height={5}
                onClick={clear}
              >
                CLEAR
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
