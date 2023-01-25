import { useState } from "react";
import { Sidebar, Navbar, Button } from "../../../../component";
import { colors } from "../../../../utils/colors";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";

export default function EditFee() {
  const navigate = useNavigate();
  const fee = useSelector((state) => state.fee.fee);
  const { id } = useParams();

  const [jenis, setJenis] = useState(fee?.jenis);
  const [amount, setAmount] = useState(fee?.amount);

  const clear = () => {
    setJenis("");
    setAmount(0);
  };

  const edit = () => {
    axios
      .put(`http://localhost:8000/api/v1/cms/fee/${id}`, {
        amount,
        jenis,
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
          <div className="d-flex mt-2">
            <div style={{ width: 150 }}>Jenis FEE</div>
            <input
              type="text"
              value={jenis}
              onChange={(e) => setJenis(e.target.value)}
            />
          </div>
          <div className="d-flex mt-2">
            <div style={{ width: 150 }}>Amount</div>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
