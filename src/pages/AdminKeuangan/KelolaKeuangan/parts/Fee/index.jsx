import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../../../component";
import { colors } from "../../../../../utils/colors";

export default function Fee() {
  const [data, setData] = useState({});

  console.log(data);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/v1/cms/fee`).then((res) => {
      setData(res.data.data[0]);
    });
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between">
        <div>SHARING FEE</div>
        {/* <div>
          <Button backgroundColor={colors.green} color={colors.white}>
            + SHARING FEE
          </Button>
        </div> */}
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Jenis</th>
            <th scope="col">Fee</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data?.jenis}</td>
            <td>{data?.amount}%</td>
            <td style={{ width: 100 }}>
              <Link to="/">
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
