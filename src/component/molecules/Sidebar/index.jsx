import Button from "../../Button";
import Logo from "../../Logo";
import "./style.css";

export default function Sidebar() {
  return (
    <div>
      <div className="sidebar">
        <Logo size={150} />
        <div>Logout</div>
      </div>
    </div>
  );
}
