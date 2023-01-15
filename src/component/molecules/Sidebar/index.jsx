import Button from "../../Button";
import Logo from "../../Logo";
import "./style.css";
import { colors } from "../../../utils/colors";

export default function Sidebar() {
  return (
    <div>
      <div className="sidebar d-flex flex-column">
        <div style={{ padding: 20 }}>
          <Logo size={150} />
        </div>

        <div className="menu-item">Pemesanan</div>
        <div className="menu-item">Pemesanan</div>
        <div className="menu-item">Pemesanan</div>
      </div>
    </div>
  );
}
