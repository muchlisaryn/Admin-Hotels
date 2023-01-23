import { useDispatch, useSelector } from "react-redux";
import Button from "../../Button";
import { colors } from "../../../utils/colors";
import { useNavigate } from "react-router-dom";
import { removeLogin } from "../../../features/authSlice";
import Swal from "sweetalert2";

export default function Navbar() {
  const user = useSelector((state) => state.auth.dataUser);
  const name = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    Swal.fire({
      title: "Are you sure Logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Accept !",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeLogin());
        navigate("/");
      }
    });
  };

  return (
    <div className="d-flex justify-content-between border-bottom pb-3 align-items-center">
      <div>{`Wellcome Admin "${name}"`}</div>
      <div className="d-flex">
        {user ? (
          <Button
            title="Logout"
            color={colors.white}
            backgroundColor={colors.blue}
            onClick={logout}
            height={7}
          />
        ) : (
          <Button
            title="Login"
            color={colors.white}
            backgroundColor={colors.blue}
            onClick={() => navigate("/")}
            height={8}
          />
        )}
      </div>
    </div>
  );
}
