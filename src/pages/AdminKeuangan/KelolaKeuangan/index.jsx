import { Button, Sidebar, HeaderNav, Navbar } from "../../../component";

import "./style.css";
import RekeningBank from "./parts/Rekening";
import Fee from "./parts/Fee";

export default function KelolaKeuangan() {
  return (
    <div className="d-flex ">
      <Sidebar />
      <div className="w-100 p-3">
        <Navbar />
        <div className="border rounded mt-2 p-2">
          <RekeningBank />
        </div>
        <div className="border rounded mt-2 p-2">
          <Fee />
        </div>
      </div>
    </div>
  );
}
