import Button from "../../Button";
import Logo from "../../Logo";
import "./style.css";
import { colors } from "../../../utils/colors";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const user = useSelector((state) => state.auth.user);
  return (
    <div>
      <div className="sidebar d-flex flex-column">
        <div style={{ padding: 20 }}>
          <Logo size={150} />
        </div>

        {user?.role === "Admin Aplikasi" ? (
          <div className="menu-item">Kelola User</div>
        ) : (
          <></>
        )}
        {user?.role === "Admin Keuangan" ? (
          <>
            {" "}
            <div className="menu-item">Pemesanan</div>
            <div className="menu-item">Pemesanan</div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
