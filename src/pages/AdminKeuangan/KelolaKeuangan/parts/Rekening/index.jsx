import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../../../component";
import { colors } from "../../../../../utils/colors";

export default function RekeningBank() {
  const [data, setData] = useState({});

  console.log(data);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/v1/cms/rekening`).then((res) => {
      setData(res.data.data[0]);
    });
  }, []);

  return (
    <>
      <div>Nomor Rekening</div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Bank</th>
            <th scope="col">Pemilik Rekening</th>
            <th scope="col">Nomor Rekeming</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{data?.bank}</th>
            <td>{data?.pemilik}</td>
            <td>{data?.nomor}</td>
            <td style={{ width: 100 }}>
              <Link
                to={`/admin/keuangan/Kelola-keuangan/edit-rekening/${data?._id}`}
              >
                <Button color={colors.white} backgroundColor={colors.blue}>
                  EDIT
                </Button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
